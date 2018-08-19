var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var IdSchema = new Schema({
  	html:String,
  	css:String,
  	js:String
  });


var IdModel = mongoose.model('Id_coll', IdSchema);
module.exports = IdModel;



