const express = require('express');
const passport = require('passport');
const router = express.Router();
// const User = require('../models/user');

// route will be sasstrain.com/f/
router.get('/', function(req, res){
	res.render('forum_home');
});

router.get('/:slug', function(req, res){
	res.render('forum_page');
});

// TODO add search route
