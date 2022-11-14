import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SidebarFull from '../components/sidebar/SidebarFull';

const Item = () => (
  <Col xs={12} lg={4} className="d-flex my-3">
    <Card className="w-100">
      <Card.Body>
        test
      </Card.Body>
      <Card.Footer>
        test
      </Card.Footer>
    </Card>
  </Col>
);

const testingCols = () => {
  const arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push(<Item />);
  }
  return arr;
};

const Shop = () => (
  <div className="d-flex overflow-auto">
    {/* temporarily set the background to dark to test padding */}
    <SidebarFull />
    <Container fluid>
      <Row className="overflow-auto">
        {testingCols().map(col => col)}
      </Row>
    </Container>
  </div>
);

export default Shop;
