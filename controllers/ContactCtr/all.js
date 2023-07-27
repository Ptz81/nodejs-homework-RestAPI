import {Contact} from '../../models/contact.js'
const getAll = async (req, res) => {
  const { _id: owner } = req.user;//дізнаємось, хто робить запит
  //пагінація
  const { page = 1, limit = 10 } = req.query; //отримуємо параметри запиту та встановлюємо значення за замовчуванням
  const skip = (page - 1) * limit; //вираховуємо параметри мангусу - відповідно до параметрів запиту
  const result = (await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit})).populate('owner', 'name email');//додаємо власника, тоді будуть повертатись людині її додані книги
  res.json(result);
}

export default getAll;