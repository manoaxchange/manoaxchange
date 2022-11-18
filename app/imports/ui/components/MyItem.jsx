import React from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { CurrencyDollar, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';

const MyItem = () => (
  <Col xs={12} lg={4} xl={3} className="d-flex my-3">
    <Card className="w-100" style={{ minHeight: '300px' }}>
      <Card.Header className="d-flex justify-content-end gap-1">
        <Button><PencilSquare /></Button>
        <Button><CurrencyDollar /></Button>
        <Button><Trash3Fill /></Button>
      </Card.Header>
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
