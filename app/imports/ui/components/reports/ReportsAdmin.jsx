import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import ItemRemoveModal from './ItemRemoveModal';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const ReportsAdmin = ({ report }) => {
  const [showReport, setShowReport] = useState(false);
  const handleClose = () => setShowReport(false);
  const handleShow = () => setShowReport(true);

  return (
    <tr>
      <td>{report.owner}</td>
      <td>{report.itemName}</td>
      <td>{report.report}</td>
      <td><Button variant="danger" onClick={handleShow}><XCircleFill /></Button></td>
      <ItemRemoveModal handleClose={handleClose} report={report} show={showReport} />
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
