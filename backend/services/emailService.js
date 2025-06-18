
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP host
  auth: {
    user: "dreamsmine44@gmail.com",
    pass: "svwy txke wxbj sbho"
  },
});


const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: '"CarZo" <dreamsmine44@gmail.com>',
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
