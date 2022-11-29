import React, { useState } from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { CurrencyDollar } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SoldModal from './myItem/SoldModal';

const blackButton = {
  background: 'none',
  color: 'black',
  border: 'none',
  padding: 0,
};

const Sellers = ({ item }) => {

  const [showSold, setShowSold] = useState(false);
  const handleShowSold = () => setShowSold(true);
  const handleCloseSold = () => setShowSold(false);

  return (
    <Col xs={12} lg={4} xl={3} className="d-flex my-3">
      <Card className="w-100" style={{ minHeight: '300px' }}>
        <Card.Header className="d-flex justify-content-end align-items-center gap-2">
          {item.sold
            ? ''
            : [
              <Button key="sold" onClick={handleShowSold} style={blackButton}><CurrencyDollar /></Button>]}
        </Card.Header>
        <Card.Body className="d-flex align-items-center">
          <Image width="100%" height="100%" src={item.image} style={{ objectFit: 'contain' }} />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between gap-2">
          <Link className="text-decoration-none" to={`/item/${item._id}`}>
            <a className="text-decoration-none text-dark" href="/item"><b>{`${item.name}`}</b></a>
          </Link>
          {item.sold
            ? <b className="text-danger">SOLD</b>
            : <b>{`$${item.price}`}</b>}
        </Card.Footer>
      </Card>
      <SoldModal handleClose={handleCloseSold} show={showSold} item={item} />
    </Col>
  );
};

Sellers.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    sold: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default Sellers;
