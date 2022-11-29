import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import PropTypes from 'prop-types';

const CloudImg = ({ uploadedImg }) => {
  // Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dnicfzz11',
    },
  });
  // Image with a public id
  const myImage = cld.image(uploadedImg);

  return (
    <AdvancedImage cldImg={myImage} />
  );
};

CloudImg.propTypes = {
  uploadedImg: PropTypes.string.isRequired,
};

export default CloudImg;
