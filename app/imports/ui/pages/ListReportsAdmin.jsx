import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Items } from '../../api/items/Items';
import { Reports } from '../../api/reports/Reports';
import ReportsAdmin from '../components/ReportsAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListReportsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, items, reports } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Items.adminPublicationName);
    const subscription2 = Meteor.subscribe(Reports.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Stuff documents
    const itemsDocs = Items.collection.find({}).fetch();
    const reportsDocs = Reports.collection.find({}).fetch();
    return {
      items: itemsDocs,
      reports: reportsDocs,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
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
              </tr>
            </thead>
            <tbody>
              {items.map((item) => <ReportsAdmin key={item._id} item={item} reports={reports.filter(report => (report.itemId === item._id))} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListReportsAdmin;
