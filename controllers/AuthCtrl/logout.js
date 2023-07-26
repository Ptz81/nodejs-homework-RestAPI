import { User } from '../../models/user.js';

//контролер на розлогінитись
const logout = async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message: 'Logout success!'
    })
}

export default logout;