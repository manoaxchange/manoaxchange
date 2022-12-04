import { Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

/* Component for layout out a Profile Card. */
const ProfileDisplay = ({ profile }) => (
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
          Overall Rating: {profile.ratingCount / profile.ratingTotal}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

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
