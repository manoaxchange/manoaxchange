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

const ItemCard = ({ item }) => {
  const [showReport, setShowReport] = useState(false);
  const handleShowReport = () => setShowReport(true);
  const handleCloseReport = () => setShowReport(false);
  return (
    <Col xs={12} lg={4} xl={3} className="d-flex my-3">
      <Card className="w-100" style={{ minHeight: '300px' }} id="item-card">
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Link to={`/item/${item._id}`} style={{ height: '230px', width: '230px', border: '1px solid gray', backgroundColor: 'lightgray' }}>
            <Image width="100%" height="100%" src={item.image} style={{ objectFit: 'contain' }} />
          </Link>
        </Card.Body>
        <Card.Footer className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            {item.sold
              ? <b className="text-danger h4 d-flex mb-0" style={{ fontWeight: 'normal' }}>SOLD</b>
              : <div className="h4 d-flex mb-0" style={{ fontWeight: 'normal' }}>${item.price}</div>}
            <Button style={blackButton} onClick={handleShowReport}><Flag /></Button>
          </div>
          <Link className="text-decoration-none text-dark" to={`/item/${item._id}`}>
            {item.name.length < 20 ? item.name : `${item.name.substring(0, 20).trim()}...`}
          </Link>
        </Card.Footer>
      </Card>
      <ReportModal item={item} handleClose={handleCloseReport} show={showReport} />
    </Col>
  );
};

// Require a document to be passed to this component.
ItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    sold: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default ItemCard;
