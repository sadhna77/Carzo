const express = require("express");
const Car = require("../models/Carschema");
const { sendEmail } = require("../services/emailService");
const BuyCar = require("../models/BoughtCar");
const mongoose = require("mongoose");

const OrderBuycar = async (req, res) => {
  const { email, username, carname, feature, payMethod, userId } = req.body;
  const carId = req.params.carId;
  console.log("carid hai", carId);
  if (!email || !userId || !carId) {
    return res
      .status(400)
      .json({ message: "Email, User ID, and Car ID are required" });
  }

  if (email == "") {
    return res.status(400).json({ message: "Email is required" });
  }

  const message = `
  <div style="font-family: 'Poppins', sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px; border-left: 6px solid #16068b;">
      
      <!-- Logo / Profile Image -->
      <div style="text-align: center; margin-bottom: 20px;">
     <img src="http://localhost:5001/public/images/car.png" alt="CarZo Logo" width="80" style="border-radius: 50%;" />
      </div>

      <!-- Title -->
      <h2 style="color: #16068b; text-align: center;">🚗 Thank you, ${username}!</h2>

      <!-- Body -->
      <p style="font-size: 16px; color: #333;">
        We truly appreciate your interest in the <strong>${carname}</strong>.
      </p>
      <p style="font-size: 16px; color: #333;">
        Our team has received your request and will get in touch with you shortly to proceed further.
      </p>
      <p style="font-size: 16px; color: #333;">
        If you have any questions or would like to make updates to your request, just reply to this email.
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
    const boughtCar = new BuyCar({
      userId,
      carId,
      email,
      username,
      carname,
      feature,
      payMethod,
    });

    // Save boughtCar to database
    await boughtCar.save();

    // send alert email
    await sendEmail(
      email,
      "Thanks For Your Interest, CarZo !",
      message,
      `<p>${message}</p>`
    );

    res.status(200).json({ success: true, message: "Email sent", boughtCar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const fetchAlreadyBuycar = async (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ message: "User ID missing" });

  try {
    const boughtCars = await BuyCar.find({ userId }).populate("carId");

    res.status(200).json(boughtCars);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const DeleteOrder = async (req, res) => {
  const  carId  = req.params.carId;

  if (!carId) return res.status(400).json({ message: "something Wrong" });

  try {
    const deleteCar = await BuyCar.findByIdAndDelete(carId);

    if (!deleteCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Deleted successfully", deleteCar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { OrderBuycar, fetchAlreadyBuycar,DeleteOrder};
