import HttpErrors from '../../helpers/HttpError.js';
import { User } from '../../models/user.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import gravatar from 'gravatar';

const register = async (req, res) => {       //запит на реєстрацію
    const { email, password } = req.body;
    const user = await User.findOne({ email });  //перевіряємо чи людина є зареєстрована
     if (user) {
        throw HttpErrors(409, 'Email already exist!');   //якщо є викидаємо помилку
    }
    const hashPassword = await bcrypt.hash(password, 10);    //якщо немає, хешуємо пароль
    const avatar = gravatar.url(email); // створюємо кастомний аватар із бібліотеки граватар, передаємо користувача мейл 
    const newUser = await User.create({...req.body, password: hashPassword, avatar});//зберігаємо користувача у базі
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
}

export default register;
