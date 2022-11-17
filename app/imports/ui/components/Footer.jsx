import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center py-3">
        Built with &hearts; by:&nbsp;
        <a href="https://github.com/nickkaw" target="_blank" rel="noreferrer noopener">
          Nick Kaw
        </a>,
       &nbsp;
        <a href="https://github.com/giorgio-tran" target="_blank" rel="noreferrer noopener">
          Giorgio Tran
        </a>,
        &nbsp;
        <a href="https://github.com/Geeean" target="_blank" rel="noreferrer noopener">
          Gian Portillo
        </a>

        <br />
        <a
          href="https://github.com/manoaxchange"
          target="_blank"
          rel="noreferrer noopener"
          className="text-decoration-none"
        >
          ManoaXchange &copy; 2022
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
