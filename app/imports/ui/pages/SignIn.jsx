import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  useEffect(() => {
    document.title = 'manoaxchange - sign in';
  }, []);

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id="signin-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={14} md={8} lg={6} xl={5} xxl={4}>
          <Col className="text-center py-3">
            <h2>L O G I N</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <div className="custom-card">
              <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
              <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
              <ErrorsField />
              <Button type="submit" variant="dark" className="mt-2 px-5">Sign In</Button>
            </div>
          </AutoForm>
          <div className="d-flex justify-content-center py-3">
            <div>Don&apos;t have an account?&nbsp;</div>
            <Link to="/signup">Click here to register.</Link>
          </div>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
