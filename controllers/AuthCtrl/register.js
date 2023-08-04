import HttpErrors from '../../helpers/HttpError.js';
import sendMail from '../../helpers/sendgrid.js';
import { User } from '../../models/user.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';

const { BASE_URL } = process.env;

const register = async (req, res) => {       //запит на реєстрацію
    const { email, password } = req.body;
    const user = await User.findOne({ email });  //перевіряємо чи людина є зареєстрована
    if (user) {
        throw HttpErrors(409, 'Email already exist!');   //якщо є викидаємо помилку
    }
    const hashPassword = await bcrypt.hash(password, 10);    //якщо немає, хешуємо пароль
    const avatar = gravatar.url(email); // створюємо кастомний аватар із бібліотеки граватар, передаємо користувача мейл 
    const verificationCode = nanoid(); //створюємо код верифікації і передаємо його внизу до юзера
    
    const newUser = await User.create({ ...req.body, password: hashPassword, avatar, verificationCode });//зберігаємо користувача у базі
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target = "_blank" href = "${BASE_URL}/api/auth/verify/${verificationCode}">Click for verification</a>`
    };//створюємо емейл
    await sendMail(verifyEmail); //відсилаємо емейл для підтвердження
    
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
}

export default register;
