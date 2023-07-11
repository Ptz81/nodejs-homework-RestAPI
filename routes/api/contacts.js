import express from 'express';
import Joi from 'joi';
import contacts from '../../models/contacts.js';
import HttpErrors from '../../helpers/HttpError.js';
// import emit from 'nodemon';
const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result);
  }catch (error) {
    next(error)
   }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id)
    if (!result) {
      throw HttpErrors(404, "Not found")
    }
    res.json(result);
  } catch (error) {
    next(error)
   }
  
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpErrors(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
     const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpErrors(404, "Not found")
    }
    // res.status(204).send()
    res.json({
    message: "Status:204. Successful removal!"
  })
  } catch (error) {
  next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
     const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpErrors(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    
if (!result) {
      throw HttpErrors(404, "Not found")
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
})

export default router;
