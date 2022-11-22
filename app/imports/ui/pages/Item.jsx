import React from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Item from '../components/Item';
import { Items } from '../../api/items/Items';
import LoadingSpinner from '../components/LoadingSpinner';

const Itempages = () => {

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

  return (itemsReady() ? (
    <Container className="py-3">
      {items.map(item => <Item item={item} />)}
    </Container>
  ) : <LoadingSpinner />);
};

export default Itempages;
