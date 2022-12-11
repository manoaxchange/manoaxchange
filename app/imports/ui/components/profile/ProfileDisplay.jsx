import { Card, Col, Container, Image } from 'react-bootstrap';
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
    <>
      {/* <Card className="h-100"> */}
      {/*  <Card.Header> */}
      {/*    <Image src={profile.picture} width={200} /> */}
      {/*  </Card.Header> */}
      {/*  <Card.Title>{profile.firstName} {profile.lastName}</Card.Title> */}
      {/*  <Card.Body> */}
      {/*    <Card.Text> */}
      {/*      Biography: {profile.bio} */}
      {/*    </Card.Text> */}
      {/*    <Card.Text> */}
      {/*      Overall Rating: {total / count} / 5 */}
      {/*    </Card.Text> */}
      {/*  </Card.Body> */}
      {/* </Card> */}
      <Container fluid className="d-flex justify-content-center">
        <div className="h-25">
          <div style={{ height: '300px', width: '300px' }}>
            <Image src={profile.picture} height="100%" width="100%" style={{ objectFit: 'cover', borderRadius: '3px' }} />
          </div>
          <div>
            {`${profile.firstName.toUpperCase()} ${profile.lastName.toUpperCase()}`}
          </div>
        </div>
      </Container>
    </>
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
