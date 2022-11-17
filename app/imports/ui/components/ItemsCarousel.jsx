import React from 'react';
import { Carousel } from 'react-bootstrap';

const ItemsCarousel = () => (
  <Carousel fade className="bg-black">
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="images/macbook.jpg"
        alt="First slide"
        style={{ height: '660px', objectFit: 'cover' }}
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <div className="bg-dark class">
        <img
          className="d-block w-100"
          src="images/clrs.jpeg"
          alt="Second slide"
          style={{ height: '660px', objectFit: 'cover' }}
        />
      </div>
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="images/moped.jpeg"
        alt="Third slide"
        style={{ height: '660px', objectFit: 'cover' }}
      />
    </Carousel.Item>
  </Carousel>
);

export default ItemsCarousel;
