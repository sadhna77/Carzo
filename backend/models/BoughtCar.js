const mongoose = require("mongoose");
const InternUser = require('../models/User')

const buyCar = new mongoose.Schema({
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
  carname: {
    type: String,
    required: true,
  },
  email: String,
  contact: String,
  address: String,
  payMethod: [String],
  feature: [String], 
}, { timestamps: true });

module.exports = mongoose.model("BuyCar", buyCar);
