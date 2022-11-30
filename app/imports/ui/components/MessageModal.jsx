import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

const MessageModal = ({ show, handleClose, item }) => {
  const currentUser = useTracker(() => (Meteor.user() ? Meteor.user().username : ''), []);
  const seller = item.owner;
  const sendMessage = async (event) => {
    event.preventDefault();
    const mailOptions = {
      to: [seller, currentUser],
      subject: `[MANOAXCHANGE] ${item.name}`,
      text: `BUYER: ${currentUser}, SELLER: ${seller}`,
    };

    try {
      const result = await axios.post('/api/mail/send', mailOptions);
      console.log(result.status);
    } catch (error) {
      console.log(error);
    }
  };

  return currentUser ? (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message Seller</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are alerting the seller that you are interested in this item. Both you and the seller will receive an email from ManoaXchange. From there on, please communicate via email. Click <b>Send Message</b> to continue.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={(event) => {
            sendMessage(event);
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
  ) : '';
};

MessageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    owner: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default MessageModal;
