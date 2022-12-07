import React from 'react';
import { Nav } from 'react-bootstrap';
import { Bicycle, Book, Keyboard, LampFill, Mortarboard, PuzzleFill, Shop } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { CATEGORIES } from '../../../api/items/Items';
import SearchBar from '../SearchBar';

const SidebarFull = ({ handleCategoryType, handleSearch }) => (
  <div
    className="px-3 py-3 text-black vh-100 sticky-top"
    style={{ width: '300px', backgroundColor: '#ECECEC' }}
  >
    <Nav className="d-flex flex-column">
      <Nav.Item key="searchbox">
        <SearchBar handleSearch={handleSearch} />
      </Nav.Item>
      <Nav.Item className="shop-nav-item">
        <Nav.Link
          onClick={() => handleCategoryType('All')}
          className="text-dark d-flex gap-2 align-items-center"
          style={{ paddingLeft: 0 }}
        >
          <Shop /> All Items
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="shop-nav-item">
        <Nav.Link
          onClick={() => handleCategoryType(CATEGORIES.books)}
          className="text-dark d-flex gap-2 align-items-center"
          style={{ paddingLeft: 0 }}
        >
          <Book /> Books
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="shop-nav-item">
        <Nav.Link
          onClick={() => handleCategoryType(CATEGORIES.electronics)}
          className="text-dark d-flex gap-2 align-items-center"
          style={{ paddingLeft: 0 }}
        >
          <Keyboard /> Electronics
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="shop-nav-item">
        <Nav.Link
          onClick={() => handleCategoryType(CATEGORIES.clothing)}
          className="text-dark d-flex gap-2 align-items-center"
          style={{ paddingLeft: 0 }}
        >
          <Mortarboard /> Clothing
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="shop-nav-item">
        <Nav.Link
          onClick={() => handleCategoryType(CATEGORIES.housewares)}
          className="text-dark d-flex gap-2 align-items-center"
          style={{ paddingLeft: 0 }}
        >
          <LampFill /> Housewares
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="shop-nav-item">
        <Nav.Link
          onClick={() => handleCategoryType(CATEGORIES.transportation)}
          className="text-dark d-flex gap-2 align-items-center"
          style={{ paddingLeft: 0 }}
        >
          <Bicycle /> Transportation
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="shop-nav-item">
        <Nav.Link
          onClick={() => handleCategoryType(CATEGORIES.misc)}
          className="text-dark d-flex gap-2 align-items-center"
          style={{ paddingLeft: 0 }}
        >
          <PuzzleFill /> Miscellaneous
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
);

SidebarFull.propTypes = {
  handleCategoryType: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SidebarFull;
