const nodemailer = require('nodemailer');

function sendVerificationEmail(email, emailVerificationToken) {
  try {
    console.log("vvhgckuvu")
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      auth: {
        user: 'muskan@techcarrel.com',
        pass: 'Muskan@TC-2023'
      },


    })

    const mailOptions = {
      from: 'muskan@techcarrel.com',
      to: email,
      subject: 'Email Verification',
      html: `Your verification code is: ${emailVerificationToken}`,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

module.exports = sendVerificationEmail;
