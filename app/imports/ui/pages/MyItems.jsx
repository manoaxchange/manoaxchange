import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SearchBar from '../components/SearchBar';
import { Items } from '../../api/items/Items';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import ItemCard2 from '../components/shop/ItemCard2';

const MyItems = () => {
  const [search, setSearch] = useState('');

  const { items } = useTracker(() => {
    const user = Meteor.user();
    if (user) {
      const itemItems = Items.collection.find({ owner: user.username }).fetch();
      console.log(user.username);
      return {
        items: itemItems,
      };
    }
    return {
      items: null,
    };
  });

  useEffect(() => {
    console.log('rendered');
    document.title = 'manoaxchange - my items';
  }, []);

  console.log('items:', items);
  console.log('search:', search);

  const handleSearch = (input) => { setSearch(`${input}`); };

  const filterItems = (array) => array.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (items ? (
    <Container id={PAGE_IDS.MY_ITEMS} className="py-3">
      <SearchBar handleSearch={handleSearch} />
      <Row>
        {filterItems(items).map(item => <ItemCard2 key={`item-${item._id}`} item={item} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MyItems;
