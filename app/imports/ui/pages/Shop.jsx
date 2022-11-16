import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import SidebarFull from '../components/shop/SidebarFull';
import { Items } from '../../api/items/Items';
import Item from '../components/shop/Item';

const ALL = 'All';
const Shop = () => {
  const [showItems, setShowItems] = useState([]);
  const [categoryType, setCategoryType] = useState(ALL);
  const handleCategoryType = (category) => { setCategoryType(`${category}`); };

  const { items } = useTracker(() => {
    const allItems = Items.collection.find({}).fetch();
    return {
      items: allItems,
    };
  }, []);

  useEffect(() => {
    console.log('rendered');
    document.title = 'ManoaXchange - Shop';
    if (categoryType === ALL) {
      setShowItems(items);
    } else {
      setShowItems(items.filter(item => item.category === categoryType));
    }
  }, [items.length, categoryType]);

  console.log('categoryType', `${categoryType}`);
  return (
    <div className="d-flex">
      {/* temporarily set the background to dark to test padding */}
      <SidebarFull handleCategoryType={handleCategoryType} />
      <Container fluid className="min-vh-100">
        <h1 className="py-2">{`${categoryType}`}</h1>
        <Row>
          {showItems.map(item => <Item key={item._id} item={item} />)}
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
