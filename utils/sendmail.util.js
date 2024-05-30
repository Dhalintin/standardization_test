const nodemailer = require('nodemailer');

async function sendEmail(email, emailMessage) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
            user: 'apikey',
            pass: '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',
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
