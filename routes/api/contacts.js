import express from 'express';
import ctrl from '../../controllers/contactsCtrl.js';
const router = express.Router()
// import validateBody from '../../middlewares/validateBody.js';
// import addSchema from '../../schemas/contact.js'

router.get('/', ctrl.getAll);

// router.get('/:id', ctrl.getById);

router.post('/', ctrl.addContact);

// router.delete('/:id', ctrl.deleteContact);

// router.put('/:id', validateBody(addSchema), ctrl.updateContact);

export default router;
