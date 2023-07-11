import contacts from '../models/contacts.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const getAll = async (req, res) => {
    const result = await contacts.listContacts();
  res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id)
    if (!result) {
      throw HttpErrors(404, "Not found")
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
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

const updateContact = async (req, res) => {
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