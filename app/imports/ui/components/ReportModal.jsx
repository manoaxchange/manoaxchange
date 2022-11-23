import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Flag } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const ReportModal = ({ show, handleClose, item }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Report <Flag /></Modal.Title>
    </Modal.Header>
    <Modal.Body>{`Are you sure you want to delete ${item.name}?`}</Modal.Body>
    <Modal.Footer>
      <Button
        variant="danger"
        onClick={() => console.log(item._id)}
      >
        Submit
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

ReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReportModal;
