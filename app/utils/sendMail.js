const nodemailer = require('nodemailer');

// Конфигурация Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alibi2003i9@gmail.com',
    pass: 'copegglwliimwulo',
  },
});

// Функция для отправки сообщения
function sendEMail(to, subject, text){
    const mailOptions = {
        from: 'alibi2003i9@gmail.com',
        to: to,
        subject: subject,
        text: `Press http://localhost:8000/api/auth/verify/${text} to verify your email.`,
      };

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log('Email sent to ' + info.response);
        }
      });
}

module.exports = sendEMail;