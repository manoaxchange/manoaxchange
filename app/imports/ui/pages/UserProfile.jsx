import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import ProfileDisplay from '../components/profile/ProfileDisplay';
import { PAGE_IDS } from '../utilities/PageIDs';

const UserProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    const currentUser = (Meteor.user() ? Meteor.user().username : '');
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find({ owner: currentUser }).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <div id={PAGE_IDS.USER_PROFILE}>
      <ProfileDisplay key={profiles[0].owner} profile={profiles[0]} />
      <div style={{ height: '225px' }}> </div>
    </div>
  ) : <LoadingSpinner />);
};

export default UserProfile;
