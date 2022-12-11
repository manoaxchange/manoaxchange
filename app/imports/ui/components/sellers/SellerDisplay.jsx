import React from 'react';
import { Image, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StarFill } from 'react-bootstrap-icons';
import { Ratings } from '../../../api/ratings/Ratings';

/* Component for layout out a Profile. */
const SellerDisplay = ({ profile }) => {
  const ratings = Ratings.collection.find({ profileId: profile._id }).fetch();
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
    <Col style={{ height: '150px' }}>
      {console.log(profile.firstName, ratings.length)}
      <div
        className="d-flex flex-row align-items-center py-3 gap-5 h-100"
        style={{ borderBottom: '1px solid rgb(0,0,0,0.175)' }}
      >
        <Link style={{ height: '100px', width: '100px' }} to={`/profileother/${profile._id}`}>
          <Image src={profile.picture} height="100%" width="100%" style={{ objectFit: 'cover' }} />
        </Link>
        <span className="h-100 w-75 pt-1">
          <Link style={{ textDecoration: 'none' }} className="underline text-dark h3" to={`/profileother/${profile._id}`}>
            {`${profile.firstName} ${profile.lastName}`}
          </Link>
          <div className="d-flex align-items-center gap-2 pt-3 h5">
            {averageRating(ratings) ? averageRating(ratings).toFixed(2) : 'Not Rated Yet'}
            <div>({ratings.length - 1})</div>
          </div>
        </span>
      </div>
    </Col>
  );
};

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
