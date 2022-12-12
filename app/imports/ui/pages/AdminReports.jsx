import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Reports } from '../../api/reports/Reports';
import ReportsTable from '../components/reports/ReportsTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const AdminReports = () => {
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

  useEffect(() => {
    document.title = 'manoaxchange- admin';
  }, []);

  return (ready ? (
    <Container id={PAGE_IDS.REPORTS_ADMIN} className="py-3">
      <h1>REPORTS</h1>
      <Row xs={1}>
        {reports.map((report) => <ReportsTable key={report.createdAt} report={report} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminReports;
