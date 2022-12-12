import { Container, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Ratings } from '../../../api/ratings/Ratings';
import RatingModal from '../sellers/RatingModal';
import EditUserProfile from '../../pages/EditUserProfile';

/* Component for layout out a Profile Card. */

const ProfileDisplay = ({ profile }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

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
    <>
      <div style={{ marginBottom: '-70px' }}>
        <div style={{ height: '225px', backgroundColor: '#ECECEC' }}> </div>
        <Container fluid className="d-flex justify-content-center">
          <div
            className="d-flex flex-column align-items-center justify-content-center gap-2"
            style={{ transform: 'translateY(-25%)' }}
          >
            <div style={{ height: '250px', width: '250px' }}>
              <Image src={profile.picture} className="h-100 w-100" style={{ objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <div style={{ fontWeight: 'normal' }} className="d-flex flex-column align-items-center">
              <div className="display-5">{`${profile.firstName.toUpperCase()} ${profile.lastName.toUpperCase()}`}</div>
              <div className="display-6 pb-2">
                <span>{averageRating(ratings) ? averageRating(ratings).toFixed(2) : 'No Ratings'}</span>
                <span>&nbsp;({ratings.length - 1})</span>
              </div>
              {Meteor.user().username !== profile.owner
                ? (
                  <button
                    type="button"
                    onClick={handleShow}
                    style={{ backgroundColor: 'transparent', border: 'none', textDecoration: 'underline' }}
                  >
                    Rate This User
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleShowProfile}
                    style={{ backgroundColor: 'transparent', border: 'none', textDecoration: 'underline' }}
                  >
                    Edit Profile
                  </button>
                )}
            </div>
          </div>
        </Container>
        <RatingModal handleClose={handleClose} profile={profile} show={show} rating={hasRatedBefore} />
      </div>
      <Container fluid className="py-3">
        <div className="display-6 py-3 d-flex flex-column align-items-center" style={{ borderTop: '1px solid #ECECEC' }}>
          About Me
        </div>
        <Container className="d-flex justify-content-center pb-3">
          <div>{profile.bio}</div>
        </Container>
        <EditUserProfile show={showProfile} handleClose={handleCloseProfile} profile={profile} />
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
