import HttpErrors from "../helpers/HttpError.js";
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
const { SECRET_KEY } = process.env;

const authenticate = async(req, res, next) => {
    const { authorization = '' } = req.headers; //доступ до заголовків
    const [bearer, token] = authorization.split(' ');//виймаємо і розділяємо токен та Bearer
    if (bearer !== "Bearer") {
        next(HttpErrors(401));
    }//перевірка чи Bearer відповідає 
    try {
        const { id } = jwt.verify(token, SECRET_KEY); //перевірка чи ми кодували і чи валідний токен
        const user = await User.findById(id); //перевіряємо чи є користувач взагалі
        if (!user) {
            next(HttpErrors(401)); //якщо немає - викидаємо помилку
        }
        req.user = user;//дізнаємося користувача, дані будуть і в контролері, щоб бачити, хто робив запит - додава, оновляв тощо
        next() //якщо є, ідемо далі
    } catch {
        next(HttpErrors(401));
    }
}
export default authenticate;