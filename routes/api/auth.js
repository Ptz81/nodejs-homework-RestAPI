import express from "express";
import validateBody from '../../middlewares/validateBody.js';
import { userSchemaSet } from '../../models/user.js';
import ctr from '../../controllers/AuthCtrl/auth.js'
import authenticate from '../../middlewares/authenticate.js'

const router = express.Router();
//роут на реєстрацію
router.post('/register', validateBody(userSchemaSet.registerSchema), ctr.register);
//роут на логін
router.post('/login', validateBody(userSchemaSet.loginSchema), ctr.login);
//роут на поточного корисувача
router.get('/current', authenticate, ctr.getCurrent);
//роут на логаут
router.post('/logout', authenticate, ctr.logout);

export default router;