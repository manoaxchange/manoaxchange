import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import { Items } from '../../api/items/Items';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const ReportsAdmin = ({ report }) => {
  const removeItem = (docID) => {
    Items.collection.remove(docID);
  };
  return (
    <tr>
      <td>{report.owner}</td>
      <td>{report.itemName}</td>
      <td>{report.report}</td>
      <td><Button variant="danger" onClick={() => removeItem(report.itemId)}><XCircleFill /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
ReportsAdmin.propTypes = {
  report: PropTypes.shape({
    owner: PropTypes.string,
    itemName: PropTypes.string,
    itemId: PropTypes.string,
    report: PropTypes.string,
  }).isRequired,
};

export default ReportsAdmin;
