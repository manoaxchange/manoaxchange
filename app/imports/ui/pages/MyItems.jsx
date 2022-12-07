import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import MyItemCard from '../components/myItem/MyItemCard';
import SearchBar from '../components/SearchBar';
import { Items } from '../../api/items/Items';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const MyItems = () => {
  const [search, setSearch] = useState('');
  const [showItems, setShowItems] = useState([]);

  const { items } = useTracker(() => {
    const user = Meteor.user();
    if (user) {
      const itemItems = Items.collection.find({ owner: user.username }).fetch();
      console.log(user.username);
      return {
        items: itemItems,
      };
    }
    return {
      items: null,
    };
  });

  useEffect(() => {
    console.log('rendered');
    document.title = 'ManoaXchange - Shop';
    setShowItems(items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())));
  }, [items.length, search]);

  const itemsReady = () => !!items;

  console.log('items:', items);
  console.log('search:', search);

  const handleSearch = (input) => { setSearch(`${input}`); };

  return (itemsReady() ? (
    <Container id={PAGE_IDS.MY_ITEMS} className="py-3">
      <SearchBar handleSearch={handleSearch} />
      <Row>
        {showItems.map(item => <MyItemCard key={`item-${item._id}`} item={item} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MyItems;
