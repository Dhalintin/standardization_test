const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

async function sendEmail(email, emailMessage) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 2525,
        secure: false,
        auth: {
            user: process.env.EMAILUSERNAME,
            pass: process.env.EMAILPASSWORD,
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
