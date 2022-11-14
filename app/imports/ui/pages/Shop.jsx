import React from 'react';
import { Container } from 'react-bootstrap';
import SidebarFull from '../components/sidebar/SidebarFull';

const Shop = () => (
  <div className="d-flex">
    {/* temporarily set the background to dark to test padding */}
    <SidebarFull />
    <Container>
      hello 2
    </Container>
  </div>
);

export default Shop;
