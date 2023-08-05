import sgMail from '@sendgrid/mail';
import 'dotenv/config';
// !!усі налаштування для сангріду мають видавати - сисдамін...
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
    const email = { ...data, from: 'mr.taras.papka@gmail.com' }
    await sgMail.send(email);
    return true;
}
export default sendMail;

// const email = {
//     to: 'wolayob762@mliok.com',
//     from: 'taras@gmail.com',
//     subject: 'test mail',
//     html: "<p>Test mail from localhost</p>",
// }

// sgMail.send(email)
//     .then(() => { console.log('Email successfully delivered') })
//     .catch((error)=>{console.log(error.message)})