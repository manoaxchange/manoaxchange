import React from 'react';
import { Button, Container, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import MyItem from '../components/MyItem';

const randomItems = () => {
  const arr = [];
  for (let x = 0; x < 20; x++) {
    arr.push(<MyItem />);
  }
  return arr;
};

const MyItems = () => {
  return (
    <Container className="py-3">
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2" type="submit">
              <Search />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {randomItems().map(item => item)}
      </Row>
    </Container>
  );
};

export default MyItems;
