import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, HiddenField } from 'uniforms-bootstrap5';
import { Profiles } from '../../api/profiles/Profiles';
import { Ratings } from '../../api/ratings/Ratings';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import ImageUpload from '../components/ImageUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import apifunctions from '../services/apifunctions.js';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const handleImagePreview = (val) => setImagePreview(val);

  const [loading, setLoading] = useState(false);
  const handleShowLoading = () => setLoading(true);
  const handleNoLoading = () => setLoading(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    picture: { type: String, optional: true },
    bio: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = async (data) => {
    handleShowLoading();
    const { email, password, firstName, lastName, bio } = data;
    let picture = 'https://freesvg.org/img/abstract-user-flat-4.png';
    if (imagePreview !== null) {
      picture = await apifunctions.postImage(imagePreview);
    }
    if (email.endsWith('@hawaii.edu')) {
      Accounts.createUser({ email, username: email, password }, (err) => {
        if (err) {
          setError(err.reason);
        }
      });
      const owner = email;
      const newProfile = Profiles.collection.insert(
        { firstName, lastName, picture, bio, owner },
      );
      Ratings.collection.insert({ profileId: newProfile });
      handleNoLoading();
      console.log('user has been registered');
      setRedirectToRef(true);
    } else {
      handleNoLoading();
      setError('Invalid email address.');
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id={PAGE_IDS.SIGNUP} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SIGNUP_FORM_FIRSTNAME} name="firstName" placeholder="First name" />
                <TextField id={COMPONENT_IDS.SIGNUP_FORM_LASTNAME} name="lastName" placeholder="Last name" />
                <TextField id={COMPONENT_IDS.SIGNUP_FORM_EMAIL} name="email" placeholder="E-mail address" />
                <TextField id={COMPONENT_IDS.SIGNUP_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <ImageUpload handleImagePreview={handleImagePreview} />
                {/* <TextField id={COMPONENT_IDS.SIGNUP_FORM_PICTURE} name="picture" placeholder="Image URL" /> */}
                <HiddenField name="picture" value={imagePreview ? 'contains image' : null} />
                <LongTextField id={COMPONENT_IDS.SIGNUP_FORM_BIO} name="bio" placeholder="Biography" />
                <ErrorsField />
                {loading
                  ? <Button><LoadingSpinner /></Button>
                  : <SubmitField id={COMPONENT_IDS.SIGNUP_FORM_SUBMIT} />}
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
