import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import ProfileDisplay from '../components/profile/ProfileDisplay';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Ratings } from '../../api/ratings/Ratings';
import RatingModal from '../components/sellers/RatingModal';

const SellerProfile = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(true); };
  const handleClose = () => { setShow(false); };
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles, ratings } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Ratings.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find({ _id: _id }).fetch();
    const ratingDocs = Ratings.collection.find({ profileName: _id }).fetch();
    console.log(ratingDocs);
    console.log(profileItems, profileItems);
    console.log('_id', _id);
    return {
      profiles: profileItems,
      ratings: ratingDocs,
      ready: rdy,
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
        <Button variant="success" className="d-inline-block" href="/sellings">Selling Page</Button>
        <Button className="d-inline-block" onClick={handleShow}>Rate Profile</Button>
      </Container>
      <RatingModal handleClose={handleClose} show={show} rating={ratings} profile={profiles} />
    </Container>
  ) : <LoadingSpinner />);
};

export default SellerProfile;
