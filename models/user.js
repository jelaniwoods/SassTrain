const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcryptjs'),
  URLSlugs = require('mongoose-url-slugs');


let User = new Schema({
  username: {type: String,index:true},
	password: {	type: String},
	email: { type: String},
	name: { type: String	}
});

User.plugin(URLSlugs('username'));


User = module.exports = mongoose.model('users', User);

module.exports.createUser = (newUser, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
	    bcrypt.hash(newUser.password, salt, (err, hash) => {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = (username, callback) =>{
	let query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = (id, callback) =>{
	User.findById(id, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) =>{
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
