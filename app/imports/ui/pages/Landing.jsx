import React from 'react';
import { Button, Carousel } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Carousel>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="https://via.placeholder.com/1920x1080.png?text=Placeholder"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        <Button className="mb-2" variant="dark" href="#">View</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="https://via.placeholder.com/1920x1080.png?text=Placeholder"
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Button className="mb-2" variant="dark" href="#">View</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="https://via.placeholder.com/1920x1080.png?text=Placeholder"
        alt="Third slide"
      />
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
        <Button className="mb-2" variant="dark" href="#">View</Button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default Landing;
