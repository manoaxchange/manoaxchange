import React from 'react';
import { Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ItemCard2 = ({ item }) => (
  <Col xs={12} lg={4} xl={3} className="d-flex my-3">
    <div className="w-100" style={{ height: '300px' }}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Link to={`/item/${item._id}`} style={{ height: '230px', width: '230px', border: '1px solid rgb(0, 0, 0, 0.175)', backgroundColor: 'lightgray' }}>
          <Image width="100%" height="100%" src={item.image} style={{ objectFit: 'contain' }} />
        </Link>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <Link className="text-decoration-none text-dark" to={`/item/${item._id}`}>
            <b>{item.name.length < 20 ? item.name.toUpperCase() : `${item.name.substring(0, 20).trim().toUpperCase()}...`}</b>
          </Link>
          {item.sold
            ? <div className="text-danger">SOLD</div>
            : <div>${item.price}</div>}
        </div>
      </div>
    </div>
  </Col>
);

ItemCard2.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    sold: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};
export default ItemCard2;
