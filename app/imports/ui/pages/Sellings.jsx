import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import { _ } from 'meteor/underscore';
import Selling from '../components/sellings/SellerItemCard';
import SearchBar from '../components/SearchBar';
import { Items } from '../../api/items/Items';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Profiles } from '../../api/profiles/Profiles';

const Sellings = () => {
  const { ready, items } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(Items.userPublicationName);
    const rdy = sub1.ready();
    const rdy2 = sub2.ready();
    //const user = Meteor.user();
    const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
    const profileItems = Items.collection.find({ owner: emails.owner }).fetch();
    console.log('email', emails);
    console.log('profileItems', profileItems);
    return {
      items: profileItems,
      ready: rdy, rdy2,
    };
  }, []);
  return ready ? (
    <Container id={PAGE_IDS.SELLINGS} className="py-3">
      <Row>
        {items.map((item) => <Selling key={`item-${item._id}`} item={item} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Sellings;
