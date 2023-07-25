import {Contact} from '../models/contact.js';
const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpErrors(404, "Not found")
    }
    res.json({
    message: "Status:204. Successful removal!"
  })
}
export default deleteContact;