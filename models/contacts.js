// const { json } = require('body-parser');
// const fs = require('fs/promises');
// const {nanoid} = require('nanoid');
// const contactsPath = path.join(__dirname, 'contacts.json');
import fs from 'fs/promises';
import path from 'path';
import {nanoid} from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
   const data = await fs.readFile(contactsPath);
    return JSON.parse(data)
}

export const getContactById = async (id) => {
    const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
}

export const removeContact = async (id) => {
  const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.find(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

export const addContact = async (data) => {
  const contacts = await listContacts();
    const newContact = {
        id:nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

export const updateContact = async (id, data) => {
  const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.find(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = {contactId, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
