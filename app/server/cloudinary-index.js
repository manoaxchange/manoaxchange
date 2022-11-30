const { WebApp } = require('meteor/webapp');
const express = require('express');
const cors = require('cors');
const { Meteor } = require('meteor/meteor');
const cloudinary = require('./cloudinary/cloudinary');

/* The code in this file and other Cloudinary files has been adapted from:
 * https://www.youtube.com/watch?v=_M4gZfIFGZw&t=4222s&ab_channel=AmeenWebSchool
 */
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/cloudinary', async (req, res) => {
  res.json('hey there');
});

app.post('/api/cloudinary/upload', async (req, res) => {
  const { image } = req.body;
  const uploadedImage = await cloudinary.uploader.upload(image, {
    upload_preset: Meteor.settings.CLOUDINARY_UPLOADPRESET,
    allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'webp'],
  }, (error, result) => {
    if (error) console.log(error);
    console.log(result);
  });

  try {
    res.status(200).json(uploadedImage);
  } catch (error) {
    console.log(error);
  }
});

WebApp.connectHandlers.use(app);
