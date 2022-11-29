import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Badge, Container, Card, Image, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import SellersPage from '../components/SellersPage';
import { Items } from '../../api/items/Items';

/* Returns the Profile and associated Projects and Interests associated with the passed user email. */
function getProfileData(profile) {
  const data = Profiles.collection.find().fetch();
  console.log(_.extend({ }, data));
  console.log(profile, profile);
  return _.extend({}, data);
}

/* Renders the Profile Collection as a set of Cards. */
const ProfilesPage = () => {
  const { items } = useTracker(() => {
    const user = Meteor.user();
    if (user) {
      const itemItems = Profiles.collection.find({ owner: user.username }).fetch();
      console.log(user.username);
      return {
        items: itemItems,
      };
    }
    return {
      items: null,
    };
  });
  return items ? (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-2">
        {items.map((profile) => <SellersPage key={profile._id} profile={profile} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfilesPage;
