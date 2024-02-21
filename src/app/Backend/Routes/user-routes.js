import express from 'express';
const router = express.Router();
import userController from '../Controllers/user-controller';
import sessionController from '../Controllers/session-controller'


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
export default router;
