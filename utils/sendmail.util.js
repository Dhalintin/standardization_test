const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

async function sendEmail(email, emailMessage) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
            user: 'apikey',
            pass: env.process.MAILPASSWORD,
        },
    });

    
    const mailOptions = {
        from: 'uchexdhalitin@gmail.com',
        to: email,
        subject: 'Confirmation Mail',
        html: emailMessage
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
