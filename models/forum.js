const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  URLSlugs = require('mongoose-url-slugs');
let Post = require('./post.js'),
  User = require('./user.js');

//TODO I think this needs to also be in this file, but I'm not sure
Post = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  username: {type:String, required: false},
  timestamp: {type:Date,"default":Date.now},
  content:  {type: String, required: true},
  image_url:  {type: String, required: false}
});


//TODO add tags, make Category something else...
// its related to the forum but there should only be ONE of each category
// searching by category will bring all the Forums of that category up
// should it be it's own model?
  let Forum = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: false},
    posts: [Post]

  });

  Forum.plugin(URLSlugs('title'));

  Forum = module.exports = mongoose.model('forum', Forum);

  module.exports.create = function (newForum, callback) {
    newForum.save(callback);
  }

  module.exports.getForumById = function(id, callback){
	   Forum.findById(id, callback);
  }
