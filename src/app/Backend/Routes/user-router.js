const {Router} = require('express');
const path = require("path");
const userController = require('../controllers/user-controller');
const sessionController = require('../controllers/session-controller');
//const session = require('./files/node_modules/server.js');
const gameController = require('../controllers/game-controller');


const router = new Router();

router.post('/login', sessionController.createSession);

router.get('/logout', sessionController.deleteSession);

router.delete('/logout', sessionController.deleteSession);

router.get('/user', userController.getUserData)

router.put('/register', userController.registerUser)

router.delete('/user', userController.deleteUser)

router.post('/user', userController.registerUser)

router.patch('/user', userController.registerUser)

router.put('/user', userController.updateUserInfo)

router.patch('/user/infos', userController.updateUserInfo)

module.exports = router;
