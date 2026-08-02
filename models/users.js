var mongoose = require('mongoose');

  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
  	firstName: String,
	lastName: String,
	email: { type: String, unique: [true, 'Email already exists'] },
	password: String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	links:[String]
  	
  });


var User = mongoose.model('User', UserSchema);
module.exports = User;