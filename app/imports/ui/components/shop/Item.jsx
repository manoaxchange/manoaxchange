import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Item = ({ item }) => (
  <Col xs={12} lg={4} xl={3} className="d-flex my-3">
    <Card className="w-100" style={{ minHeight: '300px' }}>
      <Card.Body className="d-flex align-items-center">
        <Link to={`/item/${item._id}`}>
          <Image width="100%" height="100%" src={item.image} style={{ objectFit: 'contain' }} />
        </Link>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between gap-2">
        <a className="text-decoration-none text-dark" href="/#"><b>{item.name}</b></a>
        {item.sold ? <b className="text-danger">SOLD</b> : <b>${item.price}</b> }
      </Card.Footer>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    sold: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default Item;
