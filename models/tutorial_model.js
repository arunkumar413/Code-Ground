var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var TutorialSchema = new Schema({
  entry: Array,
  tutorial_title:String
  });


var TutorialModel = mongoose.model('TutorialCollection', TutorialSchema);
module.exports = TutorialModel;