import express from 'express';
import ctrl from '../../controllers/contactsCtrl.js'
const router = express.Router()

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.addContact);

router.delete('/:id', ctrl.deleteContact);

router.put('/:id', ctrl.updateContact);

export default router;
