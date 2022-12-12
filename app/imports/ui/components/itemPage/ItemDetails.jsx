import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MessageModal from '../MessageModal';
import ReportModal from '../ReportModal';
import ActionDropdown from '../myItem/ActionDropdown';

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
      <Row className="d-flex gap-5">
        <Col xs={12} sm={12} md={12} lg={6} style={{ border: '1px solid lightgray', padding: '0', backgroundColor: '#ECECEC' }}>
          <Image src={item.image} width="100%" height="100%" style={{ objectFit: 'contain' }} />
        </Col>
        <Col className="p-0 d-flex flex-column justify-content-evenly">
          <div>
            <div className="d-flex justify-content-between">
              <div className="display-6"> {`${item.name.toUpperCase()}`} </div>
              {currentUser === item.owner ? <ActionDropdown item={item} /> : ''}
            </div>
            <div style={{ fontSize: 'xx-large', fontWeight: 'lighter' }}> ${`${item.price}`} </div>
            <hr />
            <p style={{ minHeight: '100px' }}> {`${item.description}`} </p>
          </div>
          <div className="d-flex flex-column">
            {!currentUser || currentUser === item.owner
              ? ''
              : <Button variant="dark" onClick={handleShow}> Message Seller </Button>}
            <hr />
            <button
              type="button"
              style={{ border: 'none', backgroundColor: 'transparent', padding: 0, width: 'fit-content' }}
              onClick={handleShowReport}
            >
              <u>This item is inappropriate.</u>
            </button>
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
    owner: PropTypes.string,
  }).isRequired,
};

export default ItemDetails;
