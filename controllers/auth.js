import ctrlWrapper from '../helpers/ctrlWrapper.js';
import { User } from '../models/user.js';

const register = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
}

export default {
    register: ctrlWrapper(register),

}