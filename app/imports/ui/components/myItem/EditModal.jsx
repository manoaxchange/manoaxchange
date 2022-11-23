import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Items } from '../../../api/items/Items';
import LoadingSpinner from '../LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Items.schema);

const EditModal = ({ show, handleClose, item }) => {
  const submit = (data) => {
    const { name, image, description, price } = data;
    Items.collection.update(item._id, { $set: { name, image, description, price } }, (error) => (
      error
        ? swal('Error', error.message, 'error')
        : swal('Success', 'Item updated successfully', 'success')
    ));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={item}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField name="name" />
          <NumField name="price" decimal />
          <LongTextField name="description" />
          <TextField name="image" />
          <SelectField name="category" />
          <ErrorsField />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <SubmitField value="Submit" />
          <ErrorsField />
        </Modal.Footer>
      </AutoForm>
    </Modal>
  );
};

EditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    image: String,
    price: Number,
    description: String,
    name: String,
    _id: String,
  }).isRequired,
};

export default EditModal;
