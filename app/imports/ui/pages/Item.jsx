import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Items } from '../../api/items/Items';
import ItemDetails from '../components/itemPage/ItemDetails';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Item = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, items } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Items.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const itemsItems = Items.collection.find({ _id: _id }).fetch();
    console.log(itemsItems, itemsItems);
    console.log('_id', _id);
    return {
      items: itemsItems,
      ready: rdy,
    };
  }, [_id]);

  useEffect(() => {
    document.title = `manoaxchange - ${items[0].name}`;
  }, [items]);

  return (ready ? (
    <Container id={PAGE_IDS.ITEM} className="py-3">
      <ItemDetails key={`item-${items[0]._id}`} item={items[0]} />
    </Container>
  ) : <LoadingSpinner />);
};

export default Item;
