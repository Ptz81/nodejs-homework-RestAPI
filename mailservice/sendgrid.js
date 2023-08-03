import sgMail from '@sendgrid/mail';
import 'dotenv/config';

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
    to: 'wolayob762@mliok.com',
    from: 'mr.taras.papka@gmail.com',
    subject: 'test mail',
    html: "<p>Test mail from localhost</p>",
}

sgMail.send(email)
    .then(() => { console.log('Email successfully delivered') })
    .catch((error)=>{console.log(error.message)})