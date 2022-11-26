import React from 'react';
import { Button } from 'react-bootstrap';
import messageService from '../../services/gmail';

const Playground = () => {
  const sendMessage = (event) => {
    event.preventDefault();
    const mailOptions = {
      to: ['tran.giorgio@gmail.com', 'ttran2@hawaii.edu'],
      subject: 'name of the item',
      text: 'I am interested in this item.',
    };
    messageService
      .create(mailOptions)
      .then(console.log('message sent, check email'));
  };

  return (
    <Button onClick={(event) => sendMessage(event)}>Test Me</Button>
  );
};

export default Playground;
