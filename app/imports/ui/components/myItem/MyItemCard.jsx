import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ActionDropdown from './ActionDropdown';

const MyItemCard = ({ item }) => (
  <Col xs={12} lg={4} xl={3} className="d-flex my-3">
    <Card className="w-100" style={{ minHeight: '300px' }} id="item-card">
      <Card.Header className="d-flex justify-content-end align-items-center gap-2">
        <ActionDropdown item={item} />
      </Card.Header>
      <Card.Body className="d-flex align-items-center justify-content-center h-100 w-100">
        <Link to={`/item/${item._id}`}>
          <Image width="100%" height="100%" src={item.image} style={{ objectFit: 'cover' }} />
        </Link>
      </Card.Body>
      <Card.Footer className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          {item.sold
            ? <b className="text-danger h4 d-flex mb-0" style={{ fontWeight: 'normal' }}>SOLD</b>
            : <div className="h4 d-flex mb-0" style={{ fontWeight: 'normal' }}>${item.price}</div>}
        </div>
        <Link className="text-decoration-none text-dark" to={`/item/${item._id}`}>
          {item.name.length < 20 ? item.name : `${item.name.substring(0, 20).trim()}...`}
        </Link>
      </Card.Footer>
    </Card>
  </Col>
);

MyItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    sold: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default MyItemCard;
