import HttpErrors from "../../helpers/HttpError.js";
import { User } from '../../models/user.js';

const resendVerifyEmail = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpErrors(401, 'Email is not found')
    }
    if (user.verify) {
        throw HttpErrors(401, 'Email is already verify')
    }

  const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target = "_blank" href = "${BASE_URL}/api/auth/verify/${user.verificationCode}">Click for verification</a>`
    };//створюємо емейл
    await sendMail(verifyEmail); //відсилаємо емейл для підтвердження
    
    res.status(201).json({
    message: 'verify email has sent succesfully'
    });

}
export default resendVerifyEmail;