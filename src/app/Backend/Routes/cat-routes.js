import {Router} from 'express';
import catController from '../Controllers/cat-controller.js';

const router = new Router();

router.get('/cat/data', catController.getCatData);
router.get('/cat/increase', catController.increaseLevels);

export default router;
