import HttpErrors from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const { SECRET_KEY } = process.env;

const register = async (req, res) => {       //запит на реєстрацію
    const { email, password } = req.body;
    const user = await User.findOne({ email });  //перевіряємо чи людина є зареєстрована
     if (user) {
        throw HttpErrors(409, 'Email already exist!');   //якщо є викидаємо помилку
    }
    const hashPassword = await bcrypt.hash(password, 10);    //якщо немає, хешуємо пароль
    const newUser = await User.create({...req.body, password: hashPassword});//зберігаємо користувача у базі
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
}
const login = async (req, res) => {
    const { email, password } = req.body;//запит на логін
    const user = await User.findOne({ email });     //перевіряємо чи людина є зареєстрована
    if (!user) {
        throw HttpErrors(401, 'Email or Password incorrect!');      //якщо немає, викидаємо помилку
    }
    const comparePassword = await bcrypt.compare(password, user.password);    //якщо є порівнюємо пароль з бази із введеним
    if (!comparePassword) {
        throw HttpErrors(401, 'Email or Password incorrect!');    //якщо пароль не вірний викидаємо помилку
    }
const payload = {
    id: user._id,
}//якщо співпав, створюємо токен
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
    res.json({
        token,
    })
}

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}