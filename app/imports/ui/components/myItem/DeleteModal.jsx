import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Items } from '../../../api/items/Items';

const DeleteModal = ({ show, handleClose, item }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>{`Are you sure you want to delete ${item.name}?`}</Modal.Body>
    <Modal.Footer>
      <Button
        variant="danger"
        onClick={() => {
          Items.collection.remove(item._id);
          handleClose();
        }}
      >
        Delete
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default DeleteModal;
