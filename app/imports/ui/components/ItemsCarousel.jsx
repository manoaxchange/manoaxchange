import React from 'react';
import { Carousel } from 'react-bootstrap';

const ItemsCarousel = () => (
  <div style={{ borderTop: 'solid 3px gray', borderBottom: 'solid 3px gray' }}>
    <Carousel className="bg-black">
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
  </div>
);

export default ItemsCarousel;
