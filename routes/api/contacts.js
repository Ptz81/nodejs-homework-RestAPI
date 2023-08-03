import express from 'express';
const router = express.Router()
import ctrl from '../../controllers/ContactCtr/contactsCtrl.js';
import {isValidId} from '../../middlewares/isValidId.js';
import { schemaSet } from '../../models/contact.js';
import validateBody from '../../middlewares/validateBody.js';
import authenticate from '../../middlewares/authenticate.js';
// import uploadFunc from '../../middlewares/multerconfig.js';



router.use(authenticate)

router.get('/', ctrl.getAll);

router.get('/:id',isValidId, ctrl.getById);

router.post('/', validateBody(schemaSet.addSchema), ctrl.addContact);

router.delete('/:id', isValidId, ctrl.deleteContact);

router.put('/:id', isValidId, validateBody(schemaSet.addSchema), ctrl.updateContact);
router.patch('/:id/favorite', isValidId, validateBody(schemaSet.updateFavoriteSchema), ctrl.updateFavorite);

export default router;
