import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Selling from '../components/Selling';
import SearchBar from '../components/SearchBar';
import { Items } from '../../api/items/Items';
import LoadingSpinner from '../components/LoadingSpinner';

const Sellers = () => {
  const [search, setSearch] = useState('');

  const { items } = useTracker(() => {
    const user = useTracker(() => Meteor.user(), []);
    // const user = Meteor.user();
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

  const itemsReady = () => !!items;

  console.log('items:', items);
  console.log('search:', search);

  const handleSearch = (input) => { setSearch(`${input}`); };

  return (itemsReady() ? (
    <Container className="py-3">
      <SearchBar handleSearch={handleSearch} />
      <Row>
        {items.map(item => <Selling key={`item-${item._id}`} item={item} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Sellers;
