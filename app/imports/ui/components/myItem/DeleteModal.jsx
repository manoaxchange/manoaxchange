import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Items } from '../../../api/items/Items';

const DeleteModal = ({ show, handleClose, item }) => {
  const navigate = useNavigate();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Are you sure you want to delete ${item.name}?`}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          onClick={() => {
            Items.collection.remove(item._id);
            navigate('/myitems');
            handleClose();
          }}
        >
          Delete
        </Button>
        <Button variant="outline-dark" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default DeleteModal;
