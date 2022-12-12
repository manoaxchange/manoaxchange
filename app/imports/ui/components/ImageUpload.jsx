import React, { useState } from 'react';
import Compressor from 'compressorjs';
import { Form, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ImageUpload = ({ handleImagePreview }) => {
  const [imagePreview, setImagePreview] = useState(null);

  // Allows file to be read and used as src for image
  const previewFile = (file) => {
    if (file) {
      console.log('original file', file);
      const compressedFile = new Compressor(file, {
        strict: true,
        quality: 0.8,
        checkOrientation: false,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          console.log('result', result);
          // returns reader.result to parent
          reader.onloadend = () => {
            setImagePreview(reader.result);
            return handleImagePreview(reader.result);
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
      console.log('compressed file result', compressedFile);
    } else {
      setImagePreview('');
      handleImagePreview('');
    }
  };

  return (
    <>
      <div>Image</div>
      <div className="mb-3 d-flex flex-column align-items-center justify-content-center" id="ImageUpload">
        {imagePreview ? (
          <div style={{ height: '300px', width: '100%', border: '1px solid rgb(0,0,0,0.175)', backgroundColor: '#ECECEC' }}>
            <Image className="w-100 h-100" src={imagePreview} style={{ objectFit: 'contain' }} />
          </div>
        ) : ''}
        <Form.Control
          type="file"
          size="sm"
          accept="image/jpeg,image/jpg,image/png"
          onChange={(event) => {
            previewFile(event.target.files[0]);
          }}
        />
      </div>
    </>
  );
};

ImageUpload.propTypes = {
  handleImagePreview: PropTypes.func.isRequired,
};

export default ImageUpload;
