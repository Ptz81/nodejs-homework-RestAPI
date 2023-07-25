import { Contact } from '../models/contact.js';
const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpErrors(404, "Not found")
    }
    res.json(result);
}
export default getById;