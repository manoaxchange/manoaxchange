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
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
      console.log('compressed file result', compressedFile);
    } else {
      setImagePreview('');
    }
  };

  return (
    <div className="h-25 mb-3">
      {imagePreview ? <Image className="w-100" src={imagePreview} /> : ''}
      <Form.Control
        type="file"
        size="sm"
        accept="image/jpeg,image/jpg,image/png"
        onChange={(event) => {
          previewFile(event.target.files[0]);
          return handleImagePreview(imagePreview);
        }}
      />
    </div>
  );
};

ImageUpload.propTypes = {
  handleImagePreview: PropTypes.func.isRequired,
};

export default ImageUpload;
