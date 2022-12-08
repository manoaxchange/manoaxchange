import React, { useState } from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useParams } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import apifunctions from '../services/apifunctions';
import ImageUpload from '../components/ImageUpload';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

const EditUserProfile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImagePreview = (val) => setImagePreview(val);

  const [loading, setLoading] = useState(false);
  const handleShowLoading = () => setLoading(true);
  const handleNoLoading = () => setLoading(false);

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
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = async (data) => {
    handleShowLoading();
    const { firstName, lastName, bio } = data;
    const picture = await apifunctions.postImage(imagePreview);
    Profiles.collection.update(_id, { $set: { firstName, lastName, picture, bio } }, (error) => {
      if (error) {
        handleNoLoading();
        return swal('Error', error.message, 'error');
      }
      handleNoLoading();
      setImagePreview(null);
      return swal('Success', 'Profile updated successfully', 'success');
    });
  };

  return (ready ? (
    <Container id={PAGE_IDS.EDIT_USER_PROFILE} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Your Profile</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME} name="firstName" />
                <TextField name="lastName" />
                <HiddenField name="picture" value={imagePreview ? 'contains image' : null} />
                <ImageUpload handleImagePreview={handleImagePreview} />
                <LongTextField name="bio" />
                <ErrorsField />
                {loading
                  ? <Button><LoadingSpinner /></Button>
                  : <SubmitField id={COMPONENT_IDS.EDIT_PROFILE_FORM_SUBMIT} value="Submit" />}
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
