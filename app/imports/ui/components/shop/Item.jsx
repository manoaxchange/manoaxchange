import React, { useState } from 'react';
import { Card, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Flag } from 'react-bootstrap-icons';
import ReportModal from '../ReportModal';
const blackButton = {
  background: 'none',
  color: 'black',
  border: 'none',
  padding: 0,
};

const Item = ({ item }) => {
  const [showReport, setShowReport] = useState(false);
  const handleShowReport = () => setShowReport(true);
  const handleCloseReport = () => setShowReport(false);
  return (
    <Col xs={12} lg={4} xl={3} className="d-flex my-3">
      <Card className="w-100" style={{ minHeight: '300px' }}>
        <Card.Header><Button style={blackButton} onClick={handleShowReport}><Flag /></Button></Card.Header>
        <Card.Body className="d-flex align-items-center">
          <Link to={`/item/${item._id}`}>
            <Image width="100%" height="100%" src={item.image} style={{ objectFit: 'contain' }} />
          </Link>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between gap-2">
          <Link className="text-decoration-none" to={`/item/:_id${item._id}`}>
            <a className="text-decoration-none text-dark" href="/item/"><b>{item.name}</b></a>
          </Link>
          {item.sold ? <b className="text-danger">SOLD</b> : <b>${item.price}</b>}
        </Card.Footer>
      </Card>
      <ReportModal item={item} handleClose={handleCloseReport} show={showReport} />
    </Col>
  );
};

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
