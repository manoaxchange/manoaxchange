import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark text-white" style={{ borderTop: '1px solid gray' }}>
    <Container>
      <Col className="text-center py-3">
        <div className="pb-1">
          Built with &hearts; by&nbsp;
          <a href="https://github.com/nickkaw" target="_blank" rel="noreferrer noopener" className="text-decoration-none link-light">
            Nick Kaw
          </a>,
         &nbsp;
          <a href="https://github.com/giorgio-tran" target="_blank" rel="noreferrer noopener" className="text-decoration-none link-light">
            Giorgio Tran
          </a>,
          &nbsp;
          <a href="https://github.com/Geeean" target="_blank" rel="noreferrer noopener" className="text-decoration-none link-light">
            Gian Portillo
          </a>
        </div>
        <a
          href="https://github.com/manoaxchange"
          target="_blank"
          rel="noreferrer noopener"
          className="text-decoration-none link-light"
        >
          ManoaXchange &copy; 2022
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
