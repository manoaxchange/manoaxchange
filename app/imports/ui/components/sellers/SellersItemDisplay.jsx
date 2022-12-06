import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SellersItemDisplay = ({ profile }) => (
  <Row>
    <Col>
      <h1> {profile.firstName} is selling... </h1>
    </Col>
  </Row>
);

SellersItemDisplay.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default SellersItemDisplay;
