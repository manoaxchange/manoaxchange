import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useParams } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

const EditUserProfile = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, doc } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const document = Profiles.collection.findOne(_id);
    console.log(document);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { firstName, lastName, picture, bio } = data;
    Profiles.collection.update(_id, { $set: { firstName, lastName, picture, bio } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile updated successfully', 'success')));
  };

  return (ready ? (
    <Container id="edit-profile-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Your Profile</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="firstName" />
                <TextField name="lastName" />
                <TextField name="picture" />
                <LongTextField name="bio" />
                <ErrorsField />
                <SubmitField value="Submit" />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default EditUserProfile;
