import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, HiddenField } from 'uniforms-bootstrap5';
import { Items } from '../../../api/items/Items';

const bridge = new SimpleSchema2Bridge(Items.schema);

const SoldModal = ({ show, handleClose, item }) => {
  const submit = (data) => {
    const { sold } = data;
    handleClose();
    Items.collection.update(item._id, { $set: { sold } }, (error) => (
      error
        ? swal('Error', error.message, 'error')
        : swal('Success', 'Item has been sold', 'success')
    ));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={item}>
        <Modal.Header closeButton>
          <Modal.Title>Mark as Sold</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure about marking this item as <b>SOLD</b>?</div>
          <HiddenField name="sold" value />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" type="submit">Mark as Sold </Button>
        </Modal.Footer>
      </AutoForm>
    </Modal>
  );
};

SoldModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default SoldModal;
