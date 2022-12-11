import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import ProfileDisplay from '../components/profile/ProfileDisplay';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Items } from '../../api/items/Items';
import SellersItemDisplay from '../components/sellers/SellersItemDisplay';
import { Ratings } from '../../api/ratings/Ratings';
import RatingModal from '../components/sellers/RatingModal';
import ItemCard2 from '../components/shop/ItemCard2';

const SellerProfile = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles, items, ratings } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription1 = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Items.userPublicationName);
    const subscription3 = Meteor.subscribe(Ratings.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready() && subscription3.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find({ _id: _id }).fetch();
    const itemOwner = () => (profileItems.length !== 0 ? profileItems[0].owner : '');
    const sellerItems = Items.collection.find({ owner: itemOwner() }).fetch();
    const ratingDocs = Ratings.collection.find({ profileId: _id }).fetch();
    return {
      profiles: profileItems,
      items: sellerItems,
      ratings: ratingDocs,
      ready: rdy,
    };
  }, [_id]);

  return (ready ? (
    <div id={PAGE_IDS.USER_PROFILE}>
      <ProfileDisplay key={`profile-${profiles[0]._id}`} profile={profiles[0]} />
      <Container>
        <Row xs={1}>
          {items.map((item) => <ItemCard2 key={`item-${item._id}`} item={item} />)}
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default SellerProfile;
