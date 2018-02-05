const express = require('express');
const passport = require('passport');
const router = express.Router();
const Forum = require('../models/forum');

// route will be host:port/f/
router.get('/', function(req, res){
	let result = Forum.find();
	res.render('forum_home', {result: result});
});

router.get('/new', function(req, res){
	res.render('forum_new');
});

router.post('/new', (req, res) => {
	let title = req.body.title;
	let category = req.body.category;
	let description = req.body.description;

  // Validation
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('category', 'Category is required').notEmpty();

	let errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		let newForum = new Forum({
			title: title,
			category: category,
			description: description
		});

		Forum.create(newForum, (err, forum) => {
			if(err) throw err;
			console.log(forum);

		});

		req.flash('success_msg', 'You successfully started a discussion!');
		res.redirect('/f');
	}
});
router.get('/:slug', function(req, res){
	res.render('forum_page');
});

// TODO add search route

module.exports = router;
