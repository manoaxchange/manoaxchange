import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import SellerDisplay from '../components/sellers/SellerDisplay';
import SearchBar from '../components/SearchBar';
import { PAGE_IDS } from '../utilities/PageIDs';

const Sellers = () => {
  const [search, setSearch] = useState('');
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  const handleSearch = (val) => setSearch(`${val}`);
  const filterProfiles = (array) => array.filter(profile => {
    const fullName = `${profile.firstName} ${profile.lastName}`;
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    document.title = 'manoaxchange - sellers';
  }, []);

  return (ready ? (

    <Container id={PAGE_IDS.SELLERS} className="py-3">
      <SearchBar handleSearch={handleSearch} className="w-100" />
      <Row xs={1}>
        {filterProfiles(profiles).map((profile) => <SellerDisplay key={profile._id} profile={profile} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Sellers;
