var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

/* GET home page. */
router.get('/',controllers.show_editor)
router.get('/:id', controllers.return_entry);
router.post('/save', controllers.save_files);


module.exports = router;


