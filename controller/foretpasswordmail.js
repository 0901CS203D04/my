const nodemailer = require ('nodemailer');


function forgetpassword(email, token) {
  try {
    // console.log("vvhgckuvu")
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
      subject: 'reset password',
      html: `<p> you requested for reset password , kindly use this<a href= "http://localhost:3003/reset-password?token=' + token +'">resetpassword </a> to reset your password</p> `,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

module.exports = forgetpassword;