import { Router } from 'express';
import { RegisterController } from '../../controllers/auth/registerController';

const router = Router();
const registerController = new RegisterController()
router.get('/criar-conta', registerController.handle);

export default router;
