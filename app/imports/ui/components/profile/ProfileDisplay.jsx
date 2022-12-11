import { Container, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Ratings } from '../../../api/ratings/Ratings';
import RatingModal from '../sellers/RatingModal';

/* Component for layout out a Profile Card. */

const ProfileDisplay = ({ profile }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(true); };
  const handleClose = () => { setShow(false); };

  const ratings = Ratings.collection.find({ profileId: profile._id }).fetch();
  const hasRatedBefore = ratings.filter(rating => rating.userEmail === Meteor.user().username);
  const averageRating = (arr) => {
    if (arr.length < 2) {
      return '';
    }
    const temp = arr.slice(0, -1);
    if (temp.length === 1) {
      return temp[0].value;
    }
    return temp.reduce((prev, curr) => prev.value + curr.value) / temp.length;
  };

  return (
    <div className="py-3" style={{ backgroundColor: '#ECECEC' }}>
      <Container fluid className="d-flex justify-content-center">
        <div className="h-25 d-flex flex-column justify-content-center gap-2">
          <div style={{ height: '300px', width: '300px' }}>
            <Image src={profile.picture} height="100%" width="100%" style={{ objectFit: 'cover', borderRadius: '3px' }} />
          </div>
          <div>
            <div style={{ fontWeight: 'normal' }} className="h5 d-flex justify-content-between">
              <div>{`${profile.firstName.toUpperCase()} ${profile.lastName.toUpperCase()}`}</div>
              <div>
                <span>{averageRating(ratings) ? averageRating(ratings).toFixed(2) : 'Not Rated Yet'}</span>
                <span>&nbsp;({ratings.length - 1})</span>
              </div>
            </div>
            <button type="button" onClick={handleShow}>
              Rate This User
            </button>
          </div>
        </div>
      </Container>
      <RatingModal handleClose={handleClose} profile={profile} show={show} rating={hasRatedBefore} />
    </div>
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
