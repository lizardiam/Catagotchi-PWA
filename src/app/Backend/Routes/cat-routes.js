const {Router} = require('express');
const catController = require('../Controllers/cat-controller');
const userController = require('../Controllers/user-controller');

const router = new Router();

router.get('/data', catController.getCatData);
router.get('/feed', catController.feedCat);
router.get('/water', catController.waterCat);
router.get('/pet', catController.petCat);

module.exports = router;
