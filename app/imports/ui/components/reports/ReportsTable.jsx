import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { ExclamationCircleFill, XCircleFill } from 'react-bootstrap-icons';
import ItemRemoveModal from './ItemRemoveModal';
import DismissModal from './DismissModal';

/** Renders a single row in the List Stuff (Admin) table */
const ReportsTable = ({ report }) => {
  const [showReport, setShowReport] = useState(false);
  const handleClose = () => setShowReport(false);
  const handleShow = () => setShowReport(true);

  const [showDismiss, setShowDismiss] = useState(false);
  const handleDismissClose = () => setShowDismiss(false);
  const handleDismissOpen = () => setShowDismiss(true);

  return (
    <tr>
      <td>{report.owner}</td>
      <td>{report.itemName}</td>
      <td>{report.report}</td>
      <td>
        {
          report.closed
            ? <strong className="text-danger">CLOSED</strong>
            : <Button variant="danger" onClick={handleShow}><ExclamationCircleFill /></Button>
        }
      </td>
      <td>
        <Button onClick={handleDismissOpen}>
          <XCircleFill />
        </Button>
      </td>
      <ItemRemoveModal handleClose={handleClose} report={report} show={showReport} />
      <DismissModal handleClose={handleDismissClose} report={report} show={showDismiss} />
    </tr>
  );
};

// Require a document to be passed to this component.
ReportsTable.propTypes = {
  report: PropTypes.shape({
    owner: PropTypes.string,
    itemName: PropTypes.string,
    itemId: PropTypes.string,
    report: PropTypes.string,
    closed: PropTypes.bool,
  }).isRequired,
};

export default ReportsTable;
