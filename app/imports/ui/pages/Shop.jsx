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
  const [search, setSearch] = useState('');

  const handleSearch = (input) => { setSearch(`${input}`); };
  const handleCategoryType = (category) => {
    handleSearch('');
    setCategoryType(`${category}`);
  };

  const { items } = useTracker(() => {
    const allItems = Items.collection.find({}).fetch();
    return {
      items: allItems,
    };
  }, []);

  useEffect(() => {
    console.log('rendered');
    document.title = 'ManoaXchange - Shop';
    if (search.length > 0) {
      setShowItems(items.filter(item => item.name.toLowerCase().includes(search)));
    } else if (categoryType === ALL) {
      setShowItems(items);
    } else {
      setShowItems(items.filter(item => item.category === categoryType));
    }
  }, [items.length, categoryType, search]);

  console.log('categoryType:', categoryType);
  console.log('search:', search);
  return (
    <div className="d-flex">
      {/* temporarily set the background to dark to test padding */}
      <SidebarFull handleCategoryType={handleCategoryType} handleSearch={handleSearch} />
      <Container fluid className="min-vh-100">
        <h1 className="py-2">{`${categoryType}`}</h1>
        <Row>
          {showItems.length > 0
            ? showItems.map(item => <Item key={item._id} item={item} />)
            : <div> No items </div>}
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
