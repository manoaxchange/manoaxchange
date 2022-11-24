import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Flag } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { Items } from '../../../api/items/Items';

const ItemRemoveModal = ({ show, handleClose, report }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><Flag /></Modal.Title>
    </Modal.Header>
    <Modal.Body>{`Are you sure you want to delete ${report.itemName}?`}</Modal.Body>
    <Modal.Footer>
      <Button
        variant="danger"
        onClick={() => {
          Items.collection.remove(report.itemId);
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

ItemRemoveModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  report: PropTypes.shape({
    itemName: PropTypes.string,
    itemId: PropTypes.string,
  }).isRequired,
};

export default ItemRemoveModal;
