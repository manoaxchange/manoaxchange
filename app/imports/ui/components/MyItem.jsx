import React from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { CurrencyDollar, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const blackButton = {
  background: 'none',
  color: 'black',
  border: 'none',
  padding: 0,
};

const MyItem = ({ item }) => (
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
        <a className="text-decoration-none text-dark" href="/#"><b>{`${item.name}`}</b></a>
        <b>{`${item.price}`}</b>
      </Card.Footer>
    </Card>
  </Col>
);

MyItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default MyItem;
