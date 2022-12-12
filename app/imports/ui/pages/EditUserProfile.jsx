import React, { useState } from 'react';
import { Col, Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import apifunctions from '../services/apifunctions';
import ImageUpload from '../components/ImageUpload';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

const EditUserProfile = ({ show, handleClose, profile }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImagePreview = (val) => setImagePreview(val);

  const [loading, setLoading] = useState(false);
  const handleShowLoading = () => setLoading(true);
  const handleNoLoading = () => setLoading(false);

  const submit = async (data) => {
    handleShowLoading();
    const { firstName, lastName, bio } = data;
    let picture = profile.picture;
    if (imagePreview !== null) {
      picture = await apifunctions.postImage(imagePreview);
    }
    Profiles.collection.update(profile._id, { $set: { firstName, lastName, picture, bio } }, (error) => {
      if (error) {
        handleNoLoading();
        return swal('Error', error.message, 'error');
      }
      handleNoLoading();
      setImagePreview(null);
      return swal('Success', 'Profile updated successfully', 'success');
    });
  };

  return (
    <Modal id={PAGE_IDS.EDIT_USER_PROFILE} show={show} onHide={handleClose}>
      <Modal.Body>
        <Col className="text-center">
          <h2>Edit Your Profile</h2>
        </Col>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={profile}>
          <TextField id={COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME} name="firstName" />
          <TextField name="lastName" />
          <HiddenField name="picture" value={imagePreview ? 'contains image' : null} />
          <ImageUpload handleImagePreview={handleImagePreview} />
          <LongTextField name="bio" />
          <ErrorsField />
          <div className="d-flex gap-3">
            {loading
              ? <Button><LoadingSpinner /></Button>
              : (
                <Button variant="dark" id={COMPONENT_IDS.EDIT_PROFILE_FORM_SUBMIT} type="submit">
                  Submit
                </Button>
              )}
            <HiddenField name="owner" />
            <Button variant="outline-dark" onClick={handleClose}>Cancel</Button>
          </div>
        </AutoForm>
      </Modal.Body>
    </Modal>
  );
};

EditUserProfile.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default EditUserProfile;
