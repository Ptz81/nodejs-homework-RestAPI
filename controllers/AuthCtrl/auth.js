
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import register from './register.js';
import login from './login.js';
import getCurrent from './current.js';
import logout from './logout.js';
import updateAvatar from './updateAvatar.js';
import verifyEmail from './verifyEmail.js'
import resendVerifyEmail from './resendVerifyEmail.js'


export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}