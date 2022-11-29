const cloudinary = require('cloudinary').v2;
const { Meteor } = require('meteor/meteor');

cloudinary.config({
  cloud_name: Meteor.settings.CLOUDINARY_NAME,
  api_key: Meteor.settings.CLOUDINARY_APIKEY,
  api_secret: Meteor.settings.CLOUDINARY_APISECRET,
});

module.exports = cloudinary;
