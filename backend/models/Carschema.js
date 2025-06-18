// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
   
  },
  type: String,
  fuel: String,
  transmission: String,
  mileage: String,
  price: Number,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InternUser", // Reference to user model
    }
  ],
  image: String,
  feature: [String],
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
