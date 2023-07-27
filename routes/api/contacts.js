import express from 'express';
const router = express.Router()
import ctrl from '../../controllers/ContactCtr/contactsCtrl.js';
import {isValidId} from '../../middlewares/isValidId.js';
import { schemaSet } from '../../models/contact.js';
import validateBody from '../../middlewares/validateBody.js';
import authenticate from '../../middlewares/authenticate.js';
import isEmptyBody from '../../helpers/isEmptyBody.js';

router.use(authenticate)

router.get('/', ctrl.getAll);

router.get('/:id',isValidId, ctrl.getById);

router.post('/', isEmptyBody, validateBody(schemaSet.addSchema), ctrl.addContact);

router.delete('/:id', isValidId, ctrl.deleteContact);

router.put('/:id', isEmptyBody, isValidId, validateBody(schemaSet.addSchema), ctrl.updateContact);
router.patch('/:id/favorite', isEmptyBody, isValidId, validateBody(schemaSet.updateFavoriteSchema), ctrl.updateFavorite);

export default router;
