const {Router} = require('express');
const userController = require('../Controllers/user-controller');
const sessionController = require('../Controllers/session-controller');

const router = new Router();

router.post('/login', sessionController.createSession);
router.get('/logout', sessionController.deleteSession);
router.delete('/logout', sessionController.deleteSession);

router.put('/register', userController.register);
router.post('/user', userController.register);
router.patch('/user', userController.register);

router.get('/user', userController.getUserData);

router.delete('/user', userController.deleteUser);

router.put('/user', userController.updateUserInfo);
router.patch('/user/info', userController.updateUserInfo);

// Router exportieren
module.exports = router;
