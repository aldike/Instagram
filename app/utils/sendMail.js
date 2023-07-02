const nodemailer = require('nodemailer');

// Создаем транспорт для отправки email через Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shakhanov90@gmail.com',
    pass: 'cyseubmramkxefhz',
  },
});

// Маршрут для отправки email
function sendEmail(to, subject, text){
  const mailOptions = {
    from: 'shakhanov90@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  // Отправка email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmail;