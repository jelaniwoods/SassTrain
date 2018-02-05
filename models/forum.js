const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Post = require('./post.js'),
  User = require('./user.js');
  URLSlugs = require('mongoose-url-slugs');

//TODO add tags
  let Forum = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: false},
    posts: {type: [Post]}

  });
