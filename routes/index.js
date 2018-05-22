const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const Forum = require('../models/forum');

/* GET home page. */
router.get('/', ensureAuthenticated, (req, res, next) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  console.log(req.session.views);
  passport.deserializeUser(req.session.passport.user, (err, current_user) => {
		if (err) throw err;
		let result = Forum.find({}, function (err, forums) {
			if (err) {
				console.log(err);

			} else {
				console.log(forums.length, forums[0].category);

				res.render('index', {title: 'SassTrain', views: req.session.views, 'user': current_user, result: forums});
			}
		});
	});

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


module.exports = router;
