import express from "express";
import validateBody from '../../middlewares/validateBody.js';
import { userSchemaSet } from '../../models/user.js';
import ctr from '../../controllers/auth.js'

const router = express.Router();
//роут на реєстрацію
router.post('/register', validateBody(userSchemaSet.registerSchema), ctr.register);
//роут на логін
router.post('/login', validateBody(userSchemaSet.loginSchema), ctr.login);

export default router;