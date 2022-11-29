import React from 'react';
import { Card, Image, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* Component for layout out a Profile Card. */
const UserProfiles = ({ profile }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={profile.picture} width={50} />
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {profile.bio}
        </Card.Text>
        <h5>Projects</h5>
      </Card.Body>
    </Card>
  </Col>
);

UserProfiles.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserProfiles;
