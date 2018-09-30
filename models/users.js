var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

  var Schema = mongoose.Schema;
  var UserSch = new Schema({
  	githubId: String,
  	displayName: String,
  	username:String,
  	profileUrl:String,
  	location:String
  	
  });

UserSch.plugin(findOrCreate);

var User = mongoose.model('User', UserSch);
module.exports = User;