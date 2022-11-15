import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const ReportsAdmin = ({ item }) => {
  const removeItem = (docID) => {
    console.log(`Removing item with an ID of ${docID}`);
    // collection.remove(docID);
  };
  return (
    <tr>
      <td>{item.owner}</td>
      <td>{item.name} (item.itemId)</td>
      <td>{item.report}</td>
      <td><Button variant="danger" onClick={() => removeItem(item._id)}><XCircleFill /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
ReportsAdmin.propTypes = {
  item: PropTypes.shape({
    owner: PropTypes.string,
    name: PropTypes.string,
    report: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReportsAdmin;
