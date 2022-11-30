import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MessageModal from './MessageModal';
import ReportModal from './ReportModal';

const Item = ({ item }) => {
  const currentUser = useTracker(() => Meteor.user(), []);
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
          <h2 className> {`${item.name}`} </h2>
          <Image src={item.image} className="imagefix" />
        </Col>
        <Col>
          <div className="descmargin">
            <div className="itemdes">
              <Button className="px-5 buttonspace" variant="success"> Favorite </Button>
              <Button className="px-5 buttonspace" variant="danger" onClick={handleShowReport}> Report </Button>
            </div>
            <div className="rounded border">
              <p className="textspace"> {`${item.description}`} </p>
            </div>
            <div className="parent py-3">
              <div className="child">
                <h2 className="child pb-3"> ${`${item.price}`} </h2>
                {currentUser ? <Button onClick={handleShow}> Message Seller </Button> : ''}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <MessageModal handleClose={handleClose} show={show} item={item} />
      <ReportModal item={item} handleClose={handleCloseReport} show={showReport} />
    </Container>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Item;
