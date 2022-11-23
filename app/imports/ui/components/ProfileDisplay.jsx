import { Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

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
          Overall Rating: [User Rating]
        </Card.Text>
      </Card.Body>
      <Link to={`/edit/${profile._id}`}>Edit Profile</Link>
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
  }).isRequired,
};

export default ProfileDisplay;
