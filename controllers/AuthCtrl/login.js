import HttpErrors from '../../helpers/HttpError.js';
import { User } from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;//запит на логін
    const user = await User.findOne({ email });     //перевіряємо чи людина є зареєстрована
    if (!user) {
        throw HttpErrors(401, 'Email or password are incorrect!');      //якщо немає, викидаємо помилку
    }
    const comparePassword = await bcrypt.compare(password, user.password);    //якщо є порівнюємо пароль з бази із введеним
    if (!comparePassword) {
        throw HttpErrors(401, 'Email or Password incorrect!');    //якщо пароль не вірний викидаємо помилку
    }
const payload = {
    id: user._id,
}//якщо співпав, створюємо токен
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
    })
}

export default login;