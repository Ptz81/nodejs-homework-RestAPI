import express from "express";
import validateBody from '../../middlewares/validateBody.js';
import { userSchemaSet } from '../../models/user.js';
import ctr from '../../controllers/auth.js'

const router = express.Router();

router.post('/register', validateBody(userSchemaSet.registerSchema), ctr.register);


export default router;