import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import MyItem from '../components/MyItem';
import SearchBar from '../components/SearchBar';

const randomItems = () => {
  const arr = [];
  for (let x = 0; x < 20; x++) {
    arr.push(<MyItem />);
  }
  return arr;
};

const MyItems = () => {
  const [search, setSearch] = useState('');
  console.log('search:', search);

  const handleSearch = (input) => { setSearch(`${input}`); };

  return (
    <Container className="py-3">
      <SearchBar handleSearch={handleSearch} />
      <Row>
        {randomItems().map(item => item)}
      </Row>
    </Container>
  );
};

export default MyItems;
