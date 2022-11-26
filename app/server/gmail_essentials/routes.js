const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.use((req, res, next) => {
  console.log('router is working');
  next();
});

router.post('/mail/send', controllers.sendMail);

module.exports = router;
