const express = require('express');
const passport = require('passport');
const router = express.Router();
const Forum = require('../models/forum');

// route will be host:port/f/
router.get('/', function(req, res){
	let result = Forum.find({}, function (err, forums) {
		if (err) {
			console.log(err);
			res.render('forum_home');
		} else {
			console.log(forums.length, forums[0].category);
			res.render('forum_home', {result: forums});
		}
	});
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
	// console.log(res.params.slug);
	Forum.findOne({slug: req.params.slug }, function(err, post) {
		if (err) {
			console.log(err);
			res.render('forum_page');
		} else {
			console.log(' dddd');
			res.render('forum_page', {post: post, editing: false});
		}
	});
});

router.post('/:slug/update', function(req, res) {
	Forum.findOneAndUpdate({slug: req.params.slug }, {title: req.body.title , category: req.body.category, description: req.body.description }, function(err, updatedF,count) {
		
		if (err) {
			console.log(err);
			res.render('forum_page');
		} else {
			console.log(' dddd');
			res.render('forum_page', {post: updatedF});
		}
	});
	//TODO can't figure out how to redirect to an updated slug
	// below just goes to the literal '/:slug' and not an actual slug
	// res.redirect('/:slug');
});
// TODO add search route

module.exports = router;
