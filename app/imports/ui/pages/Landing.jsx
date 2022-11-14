import React from 'react';
import { Button, Carousel } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Carousel fade>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="images/macbook.jpg"
        alt="First slide"
        style={{ height: '600px', objectFit: 'cover' }}
      />
      <Carousel.Caption>
        <Button
          className="mb-2"
          variant="dark"
          href="/shop"
          style={{ width: '150px', height: '50px' }}
        >
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            Shop Now
          </div>
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <div className="bg-dark class">
        <img
          className="d-block w-100"
          src="images/clrs.jpeg"
          alt="Second slide"
          style={{ height: '600px', objectFit: 'cover'}}
        />
      </div>
      <Carousel.Caption>
        <Button
          className="mb-2"
          variant="dark"
          href="/shop"
          style={{ width: '150px', height: '50px' }}
        >
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            Shop Now
          </div>
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="images/moped.jpeg"
        alt="Third slide"
        style={{ height: '600px', objectFit: 'cover'}}
      />
      <Carousel.Caption>
        <Button
          className="mb-2"
          variant="dark"
          href="/shop"
          style={{ width: '150px', height: '50px' }}
        >
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            Shop Now
          </div>
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default Landing;
