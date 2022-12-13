import { Container, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Ratings } from '../../../api/ratings/Ratings';
import RatingModal from '../sellers/RatingModal';
import EditUserProfile from '../EditUserProfile';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';

/* Component for layout out a Profile Card. */

const ProfileDisplay = ({ profile }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  const ratings = Ratings.collection.find({ profileId: profile._id }).fetch();
  console.log('ratings', ratings);
  const hasRatedBefore = ratings.filter(rating => rating.userEmail === Meteor.user().username);
  console.log('has rated before', hasRatedBefore[0]);
  const averageRating = (arr) => {
    if (arr.length < 2) {
      return 'No Ratings';
    }

    const temp = arr.reduce((prev, curr) => prev + curr.value, 0) / (arr.length - 1);
    return temp.toFixed(2);
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
            <div className="d-flex flex-column align-items-center">
              <div className="display-6">
                {`${profile.firstName.toUpperCase()} ${profile.lastName.toUpperCase()}`}
              </div>
              <div className="display-6 pb-2">
                {averageRating(ratings)}
                &nbsp;({ratings.length - 1})
              </div>
              {Meteor.user().username !== profile.owner
                ? (
                  <button
                    id={COMPONENT_IDS.RATE_PROFILE_BUTTON}
                    type="button"
                    onClick={handleShow}
                    style={{ backgroundColor: 'transparent', border: 'none', textDecoration: 'underline' }}
                  >
                    Rate This User
                  </button>
                ) : (
                  <button
                    id={COMPONENT_IDS.EDIT_PROFILE_BUTTON}
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
        <RatingModal handleClose={handleClose} profile={profile} show={show} rating={hasRatedBefore[0]} />
      </div>
      <Container fluid className="py-3">
        <div className="pb-3">
          <div className="display-6 py-3 d-flex flex-column align-items-center" style={{ borderTop: '2px solid #ECECEC' }}>
            ABOUT ME
          </div>
          <Container className="d-flex justify-content-center">
            <div>{profile.bio}</div>
          </Container>
        </div>
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
