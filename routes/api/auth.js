import express from "express";
import validateBody from '../../middlewares/validateBody.js';
import { userSchemaSet } from '../../models/user.js';
import ctr from '../../controllers/AuthCtrl/auth.js'
import authenticate from '../../middlewares/authenticate.js'
import uploadFunc from "../../middlewares/multerconfig.js";

const router = express.Router();
//роут на реєстрацію
router.post('/register', validateBody(userSchemaSet.registerSchema), ctr.register);
//верифікація
router.get('/verify/:verificationCode', ctr.verifyEmail)

//верифікація емейлу - перевіряємо чи є такий емейл в базі
router.post('/verify', validateBody(userSchemaSet.verifySchema), ctr.resendVerifyEmail);
//роут на логін
router.post('/login', validateBody(userSchemaSet.loginSchema), ctr.login);
//роут на поточного корисувача
router.get('/current', authenticate, ctr.getCurrent);
//роут на логаут
router.post('/logout', authenticate, ctr.logout);
//роут за яким можна змінити аватар - передається одне поле аватар з файлом
router.patch('/avatar', authenticate, uploadFunc.single('avatar'), ctr.updateAvatar)
export default router;