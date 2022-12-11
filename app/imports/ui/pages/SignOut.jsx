import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col id={PAGE_IDS.SIGNOUT} className="text-center py-3"><h2>You are signed out.</h2></Col>
  );
};

export default SignOut;
