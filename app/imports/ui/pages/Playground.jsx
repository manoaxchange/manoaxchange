import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import axios from 'axios';
import messageService from '../../services/gmail';
import CloudImg from '../components/CloudImg';

const Playground = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imgId, setImgId] = useState('');
  const sendMessage = (event) => {
    event.preventDefault();
    const mailOptions = {
      to: ['tran.giorgio@gmail.com', 'ttran2@hawaii.edu'],
      subject: 'name of the item',
      text: 'I am interested in this item.',
    };
    messageService
      .create(mailOptions)
      .then(console.log('message sent, check email'));
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post('/api/cloudinary/upload', {
      image: image,
    });
    try {
      setImgId(result.data.public_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <Button onClick={(event) => sendMessage(event)}>Send Email</Button>
      <Form.Group controlId="formFileSm" className="mt-3">
        <Form.Label>Input</Form.Label>
        <Form.Control
          type="file"
          size="sm"
          accept="image/jpeg,image/jpg,image/png"
          onChange={(event) => {
            setSelectedFile(event.target.files[0]);
            previewFile(event.target.files[0]);
          }}
        />
        {console.log('selectedFile', selectedFile)}
        <Button onClick={(event) => handleSubmit(event)}>Upload Image</Button>
      </Form.Group>
      <h1>Uploaded Image</h1>
      <Image src={image} />
      <h1>Image from Cloudinary</h1>
      <CloudImg uploadedImg={imgId} />
    </div>
  );
};

export default Playground;
