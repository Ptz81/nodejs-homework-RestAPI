import express from 'express';
const router = express.Router()
import ctrl from '../../controllers/contactsCtrl.js';
import {isValidId} from '../../middlewares/isValidId.js';
import { schemaSet } from '../../models/contact.js';
import validateBody from '../../middlewares/validateBody.js';
import authenticate from '../../middlewares/authenticate.js'


router.get('/', authenticate, ctrl.getAll);

router.get('/:id',authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemaSet.addSchema), ctrl.addContact);

router.delete('/:id', authenticate, isValidId, ctrl.deleteContact);

router.put('/:id', authenticate, isValidId, validateBody(schemaSet.addSchema), ctrl.updateContact);
router.patch('/:id/favorite', isValidId, validateBody(schemaSet.updateFavoriteSchema), ctrl.updateFavorite);

export default router;
