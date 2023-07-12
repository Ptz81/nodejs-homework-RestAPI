import fs from 'fs/promises';
import path from 'path';
import {nanoid} from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data)
  }
  catch (error) {
    res.status(500).json({
      message: "Server error"
    })
   }
}

const getContactById = async (id) => {
  try {
     const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
   }
   
}

const removeContact = async (id) => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.find(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
   }
  
}

const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = {
        id:nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
}

const updateContact = async (id, data) => {
  try {
    const contacts = await listContacts();
    const index = contacts.find(contact => contact.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = {id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
   }
 
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
