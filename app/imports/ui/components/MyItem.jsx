import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';

const MyItem = () => (
  <Col xs={12} lg={4} xl={3} className="d-flex my-3">
    <Card className="w-100" style={{ minHeight: '300px' }}>
      <Card.Body className="d-flex align-items-center">
        <Image width="100%" height="100%" src="#" style={{ objectFit: 'contain' }} />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between gap-2">
        <a className="text-decoration-none text-dark" href="/#"><b>SOMETHING</b></a>
        <b>SOMETHING</b>
      </Card.Footer>
    </Card>
  </Col>
);

export default MyItem;
