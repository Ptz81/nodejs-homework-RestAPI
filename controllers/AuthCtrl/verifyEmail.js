// import verify from "jsonwebtoken";
import HttpErrors from "../../helpers/HttpError.js";
import { User } from '../../models/user.js';


const verifyEmail = async(req, res) => {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });
    if (!user){
        throw HttpErrors(401, "Email is not found")
    }
    await User.findByIdAndUpdate(user._id,  {verify: true, verificationCode: '' });
    res.json({
        message: "Email verified"
    })
}

export default verifyEmail;