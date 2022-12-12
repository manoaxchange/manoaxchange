import { Meteor } from 'meteor/meteor';
import { Items } from '../../api/items/Items';
import { Profiles } from '../../api/profiles/Profiles';
import { Ratings } from '../../api/ratings/Ratings';

/* eslint-disable no-console */

const addDefaultItems = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Items.collection.insert(data);
};

const addDefaultProfiles = (data) => {
  console.log(`  Adding: ${data.firstName} ${data.lastName} (${data.owner})`);
  const newProfile = Profiles.collection.insert(data);
  console.log(`  Additionally adding a rating to id ${newProfile} (${data.owner})`);
  Ratings.collection.insert({ profileId: newProfile });
};

// Initialize the ItemsCollection if empty.
if (Items.collection.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default items.');
    Meteor.settings.defaultItems.forEach(item => addDefaultItems(item));
  }
}

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(profile => addDefaultProfiles(profile));
  }
}
