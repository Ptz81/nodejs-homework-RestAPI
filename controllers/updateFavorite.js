import {Contact} from '../models/contact.js';
const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpErrors(404, "Not found")
    }
    res.json(result);
}
export default updateFavorite;