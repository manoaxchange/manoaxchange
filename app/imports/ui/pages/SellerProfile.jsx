import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import ProfileDisplay from '../components/profile/ProfileDisplay';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Items } from '../../api/items/Items';
import Selling from '../components/sellings/SellerItemCard';
import SellersItemDisplay from '../components/sellers/SellersItemDisplay';

const SellerProfile = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles, items } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription1 = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Items.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready();
    const rdy2 = subscription2.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find({ _id: _id }).fetch();
    const sellerItems = Items.collection.find({ owner: profileItems[0].owner }).fetch();
    console.log(profileItems, profileItems);
    console.log(sellerItems, sellerItems);
    console.log('_id', _id);
    return {
      profiles: profileItems,
      items: sellerItems,
      ready: rdy, rdy2,
    };
  }, [_id]);
  return (ready ? (
    <Container id={PAGE_IDS.USER_PROFILE} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            {profiles.map((profile) => <ProfileDisplay key={`profile-${profile._id}`} profile={profile} />)}
          </Col>
        </Col>
      </Row>
      <Container className="d-flex justify-content-evenly py-3">
        <Button className="d-inline-block">Message</Button>
      </Container>
      <Container>
        <Row className="text-center">
          {profiles.map((profile) => <SellersItemDisplay key={`profile-${profile._id}`} profile={profile} />)}
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          {items.map((item) => <Selling key={`item-${item._id}`} item={item} />)}
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

export default SellerProfile;
