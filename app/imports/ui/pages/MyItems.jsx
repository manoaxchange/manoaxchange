import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import MyItem from '../components/MyItem';
import SearchBar from '../components/SearchBar';
import { Items } from '../../api/items/Items';
import LoadingSpinner from '../components/LoadingSpinner';

const randomItems = () => {
  const arr = [];
  for (let x = 0; x < 20; x++) {
    arr.push(<MyItem />);
  }
  return arr;
};

const MyItems = () => {
  const [search, setSearch] = useState('');

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

  const itemsReady = () => !!items;

  console.log('items:', items);
  console.log('search:', search);

  const handleSearch = (input) => { setSearch(`${input}`); };

  return (itemsReady() ? (
    <Container className="py-3">
      <SearchBar handleSearch={handleSearch} />
      <Row>
        {randomItems().map(item => item)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MyItems;
