const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  User = require('./user.js'),
  URLSlugs = require('mongoose-url-slugs');

  let Post = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    username: {type:String, required: false},
    timestamp: {type:Date,"default":Date.now},
    content:  {type: String, required: true},
    image_url:  {type: String, required: false}
  });

  // TODO I feel like the slug should be something else but
  // username should work fine for now
  Post.plugin(URLSlugs('username'));

  Post = module.exports = mongoose.model('Post', Post);

  module.exports.createPost = function(newPost, callback){
    console.log(newPost);
  	newPost.save(callback);
  }

  module.exports.addToForum = function(currPost, newPost, callback){
    console.log('add to forum:\n' + newPost);
    currPost.posts.push(newPost);
    currPost.save(callback);

  };
  module.exports.getPostById = function(id, callback){
  	UserPost.findById(id, callback);
  }

  module.exports.updatePost = function(post, user, callback) {
    post.user = user;
    post.save(callback);
  }
