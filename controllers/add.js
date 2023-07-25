import {Contact} from '../models/contact.js';
const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

export default addContact;