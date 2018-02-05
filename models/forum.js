const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Post = require('./post.js'),
  User = require('./user.js');
  URLSlugs = require('mongoose-url-slugs');


  let Forum = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    posts: {type: [Post]}

  });
