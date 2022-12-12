import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Items } from '../../api/items/Items';
import { Reports } from '../../api/reports/Reports';
import { Profiles } from '../../api/profiles/Profiles';
import { Ratings } from '../../api/ratings/Ratings';

// publish all items
Meteor.publish(null, function () {
  return Items.collection.find();
});

// publish items owned
Meteor.publish(Items.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Items.collection.find({ owner: username });
  }
  return this.ready();
});

// Meteor.publish(Profiles.userPublicationName, function () {
//   if (this.userId) {
//     const username = Meteor.users.findOne(this.userId).username;
//     return Profiles.collection.find({ owner: username });
//   }
//   return this.ready();
// });

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// publish all ratings
Meteor.publish(null, function () {
  return Ratings.collection.find();
});

// publish all ratings
Meteor.publish(Ratings.userPublicationName, function () {
  if (this.userId) {
    return Ratings.collection.find();
  }
  return this.ready();
});

Meteor.publish(Items.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Items.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reports.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reports.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
