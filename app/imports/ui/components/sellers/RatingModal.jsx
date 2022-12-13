import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, RadioField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Ratings } from '../../../api/ratings/Ratings';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';

const formSchema = new SimpleSchema({
  value: { type: Number, allowedValues: [1, 2, 3, 4, 5] },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const RatingModal = ({ show, handleClose, rating, profile }) => {
  const submit = (data) => {
    const userEmail = Meteor.user().username;
    const profileId = profile._id;
    const { value } = data;
    if (rating) {
      if (userEmail === profile.owner) {
        swal('Error', 'Cannot rate your own profile', 'error');
      }
      Ratings.collection.update(rating._id, { $set: { profileId, userEmail, value } }, (error) => (
        error
          ? swal('Error', error.message, 'error')
          : swal('Success', 'Rating updated successfully', 'success')
      ));
      handleClose();
    } else {
      Ratings.collection.insert({ profileId: profile._id, userEmail: userEmail, value }, (error => (
        error
          ? swal('Error', error.message, 'error')
          : swal('Success', 'Rating added successfully', 'success')
      )));
      handleClose();
    }
  };

  let fRef = null;
  return (
    <Modal show={show} onHide={handleClose}>
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} model={rating}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RadioField id={COMPONENT_IDS.RATING_FORM_VALUE} name="value" inline showInlineError labelClassName="px-5" />
          <ErrorsField />
        </Modal.Body>
        <Modal.Footer>
          <SubmitField id={COMPONENT_IDS.RATING_FORM_SUBMIT} />
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
    profileId: PropTypes.string,
    userEmail: PropTypes.string,
    value: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default RatingModal;
