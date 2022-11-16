import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import SidebarFull from '../components/shop/SidebarFull';
import { Items } from '../../api/items/Items';
import Item from '../components/shop/Item';

const Shop = () => {
  const [showItems, setShowItems] = useState([]);
  const { items } = useTracker(() => {
    const allItems = Items.collection.find({}).fetch();
    return {
      items: allItems,
    };
  }, []);

  useEffect(() => {
    console.log('rendered');
    setShowItems(items);
  }, [items.length]);

  return (
    <div className="d-flex">
      {/* temporarily set the background to dark to test padding */}
      <SidebarFull />
      <Container fluid className="min-vh-100">
        <Row>
          {showItems.map(item => <Item key={item._id} item={item} />)}
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
