import Joi from 'joi';
import contacts from '../models/contacts.js';
import HttpErrors from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().length(10)
    .pattern(/\([0-9]\){3}[0-9]{7}/i)
    .required(),
})

export const getAll = async (req, res) => {
    const result = await contacts.listContacts();
  res.json(result);
}

export const getById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id)
    if (!result) {
      throw HttpErrors(404, "Not found")
    }
    res.json(result);
}

export const addContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpErrors(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpErrors(404, "Not found")
    }
    // res.status(204).send()
    res.json({
    message: "Status:204. Successful removal!"
  })
}

export const updateContact = async (req, res) => {
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
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact), 
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact)
}