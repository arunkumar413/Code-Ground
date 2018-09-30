var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.get('/', controllers.show_editor);
router.get('/:id', controllers.return_entry);
router.post('/save', controllers.save_files);
router.get('/out/:id', controllers.display_frame);

module.exports = router;