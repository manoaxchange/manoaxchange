import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const SearchBar = ({ handleSearch }) => {
  const [filter, setFilter] = useState('');
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      return handleSearch(filter.trim());
    }}
    >
      <InputGroup className="mb-3" onSubmit={() => handleSearch(filter.trim())}>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-btn"
          onChange={(event) => setFilter(event.target.value)}
        />
        <Button variant="outline-secondary" style={{ border: '1px solid rgb(0, 0, 0, 0.175)' }} type="submit">
          <Search />
        </Button>
      </InputGroup>
    </form>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
