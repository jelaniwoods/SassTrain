const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  console.log(req.session.views);
  res.render('index', { title: 'SassTrain', user: req.user, views: req.session.views });
});



module.exports = router;
