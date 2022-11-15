import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SidebarFull from '../components/sidebar/SidebarFull';
import Item from '../components/shop/Item';


const Shop = () => (
  <div className="d-flex">
    {/* temporarily set the background to dark to test padding */}
    <SidebarFull />
    <Container fluid className="min-vh-100">
      <Row>

      </Row>
    </Container>
  </div>
);

export default Shop;
