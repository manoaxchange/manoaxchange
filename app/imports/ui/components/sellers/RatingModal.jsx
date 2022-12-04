import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, RadioField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Profiles } from '../../../api/profiles/Profiles';
import { Ratings } from '../../../api/ratings/Ratings';

const bridge = new SimpleSchema2Bridge(Ratings.schema);

const RatingModal = ({ show, handleClose, rating, profile }) => {
  const currentUser = useTracker(() => (Meteor.user() ? Meteor.user().username : ''), []);
  const ratedBefore = Ratings.collection.find({ userName: currentUser, profileName: profile }).count();
  const submit = (data) => {
    const { profileName, userName, value } = data;
    if (ratedBefore === 1) {
      handleClose();
      Ratings.collection.update(rating._id, { $set: { profileName, userName, value } }, (error) => (
        error
          ? swal('Error', error.message, 'error')
          : swal('Success', 'ItemDetails updated successfully', 'success')
      ));
    } else {
      handleClose();
      Ratings.collection.add({ profileName, userName, value }, (error) => (
        error
          ? swal('Error', error.message, 'error')
          : swal('Success', 'ItemDetails updated successfully', 'success')
      ));
      Profiles.collection.update(profile._id, { $set: {} }, (error) => (
        error
          ? swal('Error', error.message, 'error')
          : swal('Success', 'ItemDetails updated successfully', 'success')
      ));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <AutoForm schema={bridge} onSubmit={data => submit(data)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RadioField name="rating" inline showInlineError labelClassName="px-5" />
          <ErrorsField />
          {ratedBefore ? <SubmitField>Change Rating</SubmitField> : <SubmitField>Add Rating</SubmitField>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <ErrorsField />
        </Modal.Footer>
      </AutoForm>
    </Modal>
  );
};

RatingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    owner: PropTypes.string,
    ratingCount: PropTypes.number,
    ratingTotal: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  rating: PropTypes.shape({
    profileName: PropTypes.string,
    userName: PropTypes.string,
    value: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default RatingModal;
