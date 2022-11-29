import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Reports } from '../../api/reports/Reports';
import ReportsAdmin from '../components/reports/ReportsAdmin';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListReportsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, reports } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Reports.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const reportsDocs = Reports.collection.find({}).fetch();
    return {
      reports: reportsDocs,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.REPORTS_ADMIN} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>Reported Items</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Owner</th>
                <th>Item Name</th>
                <th>Report Reason</th>
                <th>Remove</th>
                <th>Dismiss</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => <ReportsAdmin report={report} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListReportsAdmin;
