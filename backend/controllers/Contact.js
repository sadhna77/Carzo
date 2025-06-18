// controllers/contactController.js
const express = require("express");
const { sendEmail } = require("../services/emailService");

const ContactEmail = async (req, res) => {
  const { email, Name, message } = req.body;
  console.log(req.body)

  if (!email || !Name || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const htmlMessage = `
  <div style="font-family: 'Poppins', sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px; border-left: 6px solid #16068b;">
      
      <!-- Logo / Profile Image -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://yourdomain.com/public/images/car.png" alt="CarZo Logo" width="80" style="border-radius: 50%;" />
      </div>

      <!-- Title -->
      <h2 style="color: #16068b; text-align: center;">🚗 Thank you, ${Name}!</h2>

      <!-- Body -->
      <p style="font-size: 16px; color: #333;">
        We truly appreciate your interest in <strong>CarZo</strong>.
      </p>
      <p style="font-size: 16px; color: #333;">
        Our team has received your message and will get in touch with you shortly.
      </p>
     <p style="font-size: 16px; color: #333; margin-top: 20px;">
      Our support team will reach out to you shortly with the next steps. In the meantime, feel free to explore our latest car listings and deals on <a href="https://carzo.com" style="color: #16068b; text-decoration: underline;">our website</a>.
    </p>

      <!-- Footer -->
      <div style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
        <p style="font-size: 14px; color: #777;">Best regards,<br><strong style="color: #16068b;">CarZo Team</strong></p>
        <p style="font-size: 13px; color: #aaa;">This is an automated message. Please do not reply directly.</p>
      </div>
    </div>
  </div>
`;

  try {
    await sendEmail(
      email,
      "Thanks for Reaching Out - CarZo!",
      message,
      htmlMessage
    );

    res.status(200).json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email send failed", error: error.message });
  }
};

module.exports = { ContactEmail };
