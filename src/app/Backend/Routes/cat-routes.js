const {Router} = require('express');
const catController = require('../Controllers/cat-controller');

const router = new Router();

router.get('/cat/')
