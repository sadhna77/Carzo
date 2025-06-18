const mongoose = require("mongoose");
const InternUser = require('../models/User')

const LikedCar = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InternUser",
    required: true,
  },
    carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car", // Reference to actual car
    required: true,
  },
  LikedCar: {
    type: Number,
    required: true,
  },
  
}, { timestamps: true });

module.exports = mongoose.model("LikedCar", LikedCar);