import React from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { CurrencyDollar, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';

const blackButton = {
  background: 'none',
  color: 'black',
  border: 'none',
  padding: 0,
};

const MyItem = () => (
  <Col xs={12} lg={4} xl={3} className="d-flex my-3">
    <Card className="w-100" style={{ minHeight: '300px' }}>
      <Card.Header className="d-flex justify-content-end align-items-center gap-2">
        <Button style={blackButton}><PencilSquare /></Button>
        <Button style={blackButton}><CurrencyDollar /></Button>
        <Button style={blackButton}><Trash3Fill /></Button>
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
