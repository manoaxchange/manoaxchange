import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MessageModal = ({ show, handleClose, item }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Message Seller</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      You are alerting the seller that you are interested in this item.  Both you and the seller will receive an email from ManoaXchange. From there on, please communicate via email. Click <b>Send Message</b> to continue.
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="danger"
        onClick={() => {
          console.log('sent');
          handleClose();
        }}
      >
        Message
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

MessageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default MessageModal;
