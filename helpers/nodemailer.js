import nodemailer from 'nodemailer';
import 'dotenv/config';

const { UKRNET_PASSWORD } = process.env;

const nodemailerConfig = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: "taras.papka@ukr.net",
        pass: UKRNET_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig)
const email = {
    to: 'taras.papka@gmail.com',
    from: 'taras.papka@ukr.net',
    subject: 'test mail',
    html: "<p>Test mail from localhost</p>",
}
transport.sendMail(email)
    .then(() => { console.log('Email successfully delivered') })
    .catch((error) => { console.log(error.message) });
