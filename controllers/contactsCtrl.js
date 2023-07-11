import Joi from 'joi';
import contacts from '../models/contacts.js';
import HttpErrors from '../helpers/HttpError.js';

export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().length(10)
    .pattern(/\([0-9]\){3}[0-9]{7}/i)
    .required(),
})

export const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result);
  }catch (error) {
    next(error)
   }
}

export const getById = async (req, res, next) => {
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
  
}

export const addContact = async (req, res, next) => {
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
}

export const deleteContact = async (req, res, next) => {
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
}

export const updateContact = async (req, res, next) => {
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
}

export default {
    getAll,
    getById,
    addContact, 
    deleteContact,
    updateContact
}