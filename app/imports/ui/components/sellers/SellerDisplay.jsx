import React, { useState } from 'react';
import { Card, Image, Col, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* Component for layout out a Profile Card. */
const [showRatingForm, setShowRatingForm] = useState(false);
const handleShow = () => { setShowRatingForm(true); };
const handleClose = () => { setShowRatingForm(false); };

const SellerDisplay = ({ profile }) => (
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
          <Link className="text-decoration-none" to={`/profileother/${profile._id}`}>
            <Button variant="success" className="d-inline-block" href="/profileother/:_id">View profile</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

SellerDisplay.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default SellerDisplay;
