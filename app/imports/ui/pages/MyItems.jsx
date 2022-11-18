import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const MyItems = () => (
  <Container fluid>
    <Row>
      <Col xs={4}>
        <Card>
          <Card.Header>
            Test
          </Card.Header>
          <Card.Body>
            Test
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default MyItems;
