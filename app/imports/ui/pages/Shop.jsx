import React from 'react';
import { Container, InputGroup, Form, Button, Nav, Navbar } from 'react-bootstrap';
import { Bicycle, Book, Keyboard, LampFill, Mortarboard, PuzzleFill, Search } from 'react-bootstrap-icons';

const Shop = () => (
  <div className="d-flex">
    {/* temporarily set the background to dark to test padding */}
    <div className="px-3 py-3 bg-dark text-white" style={{ height: '100vh', width: '300px' }}>
      <Nav className="d-flex flex-column">
        <Nav.Item key="searchbox">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              <Search />
            </Button>
          </InputGroup>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="text-light d-flex gap-2 align-items-center" style={{ paddingLeft: 0 }}>
            <Book /> Books
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="text-light d-flex gap-2 align-items-center" style={{ paddingLeft: 0 }}>
            <Keyboard /> Electronics
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="text-light d-flex gap-2 align-items-center" style={{ paddingLeft: 0 }}>
            <Mortarboard /> Clothing
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="text-light d-flex gap-2 align-items-center" style={{ paddingLeft: 0 }}>
            <LampFill /> Housewares
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="text-light d-flex gap-2 align-items-center" style={{ paddingLeft: 0 }}>
            <Bicycle /> Transportation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="text-light d-flex gap-2 align-items-center" style={{ paddingLeft: 0 }}>
            <PuzzleFill /> Miscellaneous
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
    <Container>
      hello 2
    </Container>
  </div>
);

export default Shop;
