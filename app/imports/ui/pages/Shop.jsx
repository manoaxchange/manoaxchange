import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import SidebarFull from '../components/shop/SidebarFull';
import { Items } from '../../api/items/Items';
import { PAGE_IDS } from '../utilities/PageIDs';
import ItemCard2 from '../components/shop/ItemCard2';

const ALL = 'All';

const Shop = () => {
  const [showItems, setShowItems] = useState([]);
  const [title, setTitle] = useState(ALL);
  const [search, setSearch] = useState('');

  const handleSearch = (input) => { setSearch(`${input}`); };
  const handleCategoryType = (category) => {
    handleSearch('');
    setTitle(`${category}`);
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
      setShowItems(items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())));
      setTitle(ALL);
    } else if (title === ALL) {
      setShowItems(items);
    } else {
      setShowItems(items.filter(item => item.category === title));
    }
  }, [items.length, title, search]);

  console.log('title:', title);
  console.log('search:', search);
  return (
    <div id={PAGE_IDS.SHOP} className="d-flex">
      <SidebarFull handleCategoryType={handleCategoryType} handleSearch={handleSearch} />
      <Container fluid className="min-vh-100">
        <h1 className="py-2 d-flex justify-content-center">{`${title}`}</h1>
        <Row>
          {showItems.length > 0
            ? showItems.map(item => <ItemCard2 key={item._id} item={item} />)
            : <div> No items found </div>}
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
