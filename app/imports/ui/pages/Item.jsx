import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';

const Item = () => (
  <Container className="py-3">
    <Row>
      <Col>
        <h2 className> ITEM NAME </h2>
        <Image src="https://images.pexels.com/photos/12211/pexels-photo-12211.jpeg?cs=srgb&dl=pexels-tetyana-kovyrina-12211.jpg&fm=jpg" className="imagefix" />
      </Col>
      <Col>
        <div className="descmargin">
          <div className="itemdes">
            <Button className="px-5 buttonspace" variant="success"> Favorite </Button>
            <Button className="px-5 buttonspace" variant="danger"> Report </Button>
          </div>
          <div className="rounded border">
            <p className="textspace"> The essence of Arendt’s idea was in the fact that the power of many would not become something substantial over the course of time, as the core of Jefferson’s ward system was the power </p>
          </div>
          <div className="parent py-3">
            <div className="child">
              <h2 className="pb-3"> $100.00 </h2>
              <Button> Message Seller </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Item;
