import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SidebarFull from '../components/sidebar/SidebarFull';
import Item from '../components/shop/Item';

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
