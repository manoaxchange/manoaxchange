import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import messageService from '../../services/gmail';

const Playground = () => {
  const [selectedFile, setSelectedFile] = useState(null);
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
          }}
        />
        {console.log(selectedFile)}
      </Form.Group>
    </div>
  );
};

export default Playground;
