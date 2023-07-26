import {Contact} from '../models/contact.js';
const getAll = async (req, res) => {
  const { _id: owner } = req.user;//дізнаємось, хто робить запит
    const result = await Contact.find({owner}, "-createdAt -updatedAt");//додаємо власника, тоді будуть повертатись людині її додані книги
  res.json(result);
}

export default getAll;