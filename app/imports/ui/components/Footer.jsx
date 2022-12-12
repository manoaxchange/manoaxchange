import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark text-white" style={{ borderTop: '1px solid gray' }}>
    <Container className="pt-3">
      <Col className="text-center pt-3">
        <a
          href="https://github.com/manoaxchange"
          target="_blank"
          rel="noreferrer noopener"
          className="text-decoration-none link-light"
        >
          <div style={{ fontFamily: 'Quicksand', fontSize: 'x-small' }}>
            m&nbsp;a&nbsp;n&nbsp;o&nbsp;a&nbsp;x&nbsp;c&nbsp;h&nbsp;a&nbsp;n&nbsp;g&nbsp;e
            &copy; 2022
          </div>
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
