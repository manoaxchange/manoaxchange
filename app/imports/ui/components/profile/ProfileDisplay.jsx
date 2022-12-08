import { Card, Col, Image } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import React from 'react';
import { Ratings } from '../../../api/ratings/Ratings';

/* Component for layout out a Profile Card. */

const ProfileDisplay = ({ profile }) => {
  const count = Ratings.collection.find({ profileId: profile._id }).count() - 1;
  let total = Ratings.collection.find({ profileId: profile._id }).fetch();
  total = _.pluck(total, 'value');
  total = _.reduce(total, function (memo, num) { return memo + num; }, 0);
  console.log(count, total);
  return (
    <Col>
      <Card className="h-100">
        <Card.Header>
          <Image src={profile.picture} width={200} />
        </Card.Header>
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Body>
          <Card.Text>
            Biography: {profile.bio}
          </Card.Text>
          <Card.Text>
            Overall Rating: {total / count} / 5
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

ProfileDisplay.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
    ratingCount: PropTypes.number,
    ratingTotal: PropTypes.number,
  }).isRequired,
};

export default ProfileDisplay;
