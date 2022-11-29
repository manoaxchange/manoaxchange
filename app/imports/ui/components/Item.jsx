import React, { useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MessageModal from './MessageModal';

const Item = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(true); };
  const handleClose = () => { setShow(false); };

  return (
    <Container className="py-3">
      <Row>
        <Col>
          <h2 className> {`${item.name}`} </h2>
          <Image className="imagefix" /> {`${item.image}`}
        </Col>
        <Col>
          <div className="descmargin">
            <div className="itemdes">
              <Button className="px-5 buttonspace" variant="success"> Favorite </Button>
              <Button className="px-5 buttonspace" variant="danger"> Report </Button>
            </div>
            <div className="rounded border">
              <p className="textspace"> {`${item.description}`} </p>
            </div>
            <div className="parent py-3">
              <div className="child">
                <h2 className="child pb-3"> ${`${item.price}`} </h2>
                <Button onClick={handleShow}> Message Seller </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <MessageModal handleClose={handleClose} show={show} item={item}/>
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
