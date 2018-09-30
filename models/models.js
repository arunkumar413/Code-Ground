var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var IdSchema = new Schema({
  	html:String,
  	css:String,
  	js:String,
  	title:String,
    description:String,
  	author:String,
  	likes:Number,
  	libs: Array,
  	date:{ type: Date, default: Date.now },
  	publish:{type:Boolean, default:false},
    posted_by:String,
  });


var IdModel = mongoose.model('Id_coll', IdSchema);
module.exports = IdModel;