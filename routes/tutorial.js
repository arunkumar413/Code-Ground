var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.get('/', controllers.generate_tutorial);
router.get('/:id',controllers.view_tutorial);
router.post('/',controllers.save_tutorial);
router.put('/:id',controllers.update_tutorial);

module.exports = router;
