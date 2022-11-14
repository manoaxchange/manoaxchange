import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SidebarFull from '../components/sidebar/SidebarFull';

const Item = () => (
  <Col xs={12} lg={4} xl={3} className="d-flex my-3">
    <Card className="w-100" style={{ minHeight: '300px' }}>
      <Card.Body className="d-flex align-items-center">
        <Link to="/#">
          <Image width="100%" height="100%" src="https://imageio.forbes.com/specials-images/imageserve/5e086a2f25ab5d0007cf74ec/Oahu/0x0.jpg?format=jpg&crop=1866,1244,x1,y0,safe&width=960" style={{ objectFit: 'contain' }} />
        </Link>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between gap-2">
        <a className="text-decoration-none text-dark" href="/#"><b>Item Name</b></a>
        <b>$32.00</b>
      </Card.Footer>
    </Card>
  </Col>
);

const testingCols = () => {
  const arr = [];
  for (let i = 0; i < 30; i++) {
    arr.push(<Item />);
  }
  return arr;
};

const Shop = () => (
  <div className="d-flex">
    {/* temporarily set the background to dark to test padding */}
    <SidebarFull />
    <Container fluid className="min-vh-100">
      <Row>
        {testingCols().map(col => col)}
      </Row>
    </Container>
  </div>
);

export default Shop;
