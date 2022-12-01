import React from 'react';
import { Card, Image, Col, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* Component for layout out a Profile Card. */
const SellersPage = ({ profile }) => (
  <Row>
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
          <Button variant="success" className="d-inline-block" href="/sellings">View Items</Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

SellersPage.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default SellersPage;
