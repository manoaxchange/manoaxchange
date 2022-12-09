import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MessageModal from '../MessageModal';
import ReportModal from '../ReportModal';

const ItemDetails = ({ item }) => {
  const currentUser = useTracker(() => (Meteor.user() ? Meteor.user().username : ''), []);
  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(true); };
  const handleClose = () => { setShow(false); };

  const [showReport, setShowReport] = useState(false);
  const handleShowReport = () => { setShowReport(true); };
  const handleCloseReport = () => { setShowReport(false); };

  return (
    <Container className="py-3">
      <Row>
        <Col>
          <Image src={item.image} className="imagefix" width="100%" height="100%" style={{ objectFit: 'contain' }} />
        </Col>
        <Col>
          <div>
            <h2 className="itemfont"> {`${item.name}`} </h2>
            <h2 className="itemfont"> ${`${item.price}`} </h2>
            <hr />
          </div>
          <div>
            <p className="textspace itemfont"> {`${item.description}`} </p>
          </div>
          <div>
            {!currentUser || currentUser === item.owner
              ? ''
              : <Button onClick={handleShow}> Message Seller </Button>}
            <Button className=" buttonspace" variant="success"> Favorite </Button>
            <Button className=" buttonspace" variant="danger" onClick={handleShowReport}> Report </Button>
          </div>
        </Col>
      </Row>
      <MessageModal handleClose={handleClose} show={show} item={item} />
      <ReportModal item={item} handleClose={handleCloseReport} show={showReport} />
    </Container>
  );
};

ItemDetails.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string
  }).isRequired,
};

export default ItemDetails;
