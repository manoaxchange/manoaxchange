import React, { useState } from 'react';
import { Button, Form, InputGroup, Nav } from 'react-bootstrap';
import { Bicycle, Book, Keyboard, LampFill, Mortarboard, PuzzleFill, Search, Shop } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { CATEGORIES } from '../../../api/items/Items';

const SidebarFull = ({ handleCategoryType, handleSearch }) => {
  const [filter, setFilter] = useState('');
  return (
    <div
      className="px-3 py-3 bg-dark text-white vh-100 sticky-top"
      style={{ width: '300px' }}
    >
      <Nav className="d-flex flex-column">
        <Nav.Item key="searchbox">
          <form onSubmit={(event) => {
            event.preventDefault();
            return handleSearch(filter.trim());
          }}
          >
            <InputGroup className="mb-3" onSubmit={() => handleSearch(filter.trim())}>
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(event) => setFilter(event.target.value)}
              />
              <Button variant="outline-secondary" id="button-addon2" type="submit">
                <Search />
              </Button>
            </InputGroup>
          </form>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleCategoryType('All')}
            className="text-light d-flex gap-2 align-items-center"
            style={{ paddingLeft: 0 }}
          >
            <Shop /> All Items
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleCategoryType(CATEGORIES.books)}
            className="text-light d-flex gap-2 align-items-center"
            style={{ paddingLeft: 0 }}
          >
            <Book /> Books
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleCategoryType(CATEGORIES.electronics)}
            className="text-light d-flex gap-2 align-items-center"
            style={{ paddingLeft: 0 }}
          >
            <Keyboard /> Electronics
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleCategoryType(CATEGORIES.clothing)}
            className="text-light d-flex gap-2 align-items-center"
            style={{ paddingLeft: 0 }}
          >
            <Mortarboard /> Clothing
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleCategoryType(CATEGORIES.housewares)}
            className="text-light d-flex gap-2 align-items-center"
            style={{ paddingLeft: 0 }}
          >
            <LampFill /> Housewares
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleCategoryType(CATEGORIES.transportation)}
            className="text-light d-flex gap-2 align-items-center"
            style={{ paddingLeft: 0 }}
          >
            <Bicycle /> Transportation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleCategoryType(CATEGORIES.misc)}
            className="text-light d-flex gap-2 align-items-center"
            style={{ paddingLeft: 0 }}
          >
            <PuzzleFill /> Miscellaneous
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

SidebarFull.propTypes = {
  handleCategoryType: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SidebarFull;
