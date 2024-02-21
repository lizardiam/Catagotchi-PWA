const {Router} = require('express');
const catController = require('../Controllers/cat-controller');
const userController = require('../Controllers/user-controller');

const router = new Router();

router.get('/cat/data', catController.getCatData);
router.get('/cat/increase', catController.increaseLevels);

module.exports = router;
