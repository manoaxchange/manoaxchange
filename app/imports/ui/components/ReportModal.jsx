import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Flag } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-bootstrap5';
import { Reports } from '../../api/reports/Reports';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const formSchema = new SimpleSchema({
  report: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const ReportModal = ({ show, handleClose, item }) => {
  const submit = (data, formRef) => {
    const { report } = data;
    const itemName = item.name;
    const itemId = item._id;
    const owner = item.owner;
    const createdAt = new Date();
    const closed = false;
    Reports.collection.insert(
      { report, itemName, itemId, owner, createdAt, closed },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Report has been submitted', 'success');
          formRef.reset();
        }
      },
    );
    handleClose();
  };

  let fRef = null;
  return (
    <Modal show={show} onHide={handleClose}>
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Modal.Header closeButton>
          <Modal.Title><Flag /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LongTextField id={COMPONENT_IDS.REPORT_FORM_DESCRIPTION} name="report" />
          <ErrorsField />
        </Modal.Body>
        <Modal.Footer>
          <SubmitField id={COMPONENT_IDS.REPORT_FORM_SUBMIT} value="Submit" />
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </AutoForm>
    </Modal>
  );
};

ReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default ReportModal;
