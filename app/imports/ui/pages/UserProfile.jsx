import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import ProfileDisplay from '../components/ProfileDisplay';

const UserProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            {profiles.map((profile) => <ProfileDisplay key={profile._id} profile={profile} />)}
          </Col>
        </Col>
      </Row>
      <Container className="d-flex justify-content-evenly py-3">
        <Button className="d-inline-block">Message</Button>
        <Button variant="success" className="d-inline-block" href="/sellers">Selling Page</Button>
        <Button variant="danger" className="d-inline-block">Report</Button>
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserProfile;
