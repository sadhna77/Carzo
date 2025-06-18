const mongoose = require("mongoose");
const InternUser = require('../models/User')

const UserInfo = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InternUser",
    required: true,
  },
   

  contact: String,
  address: String,
  age :Number,
  fullname:String
 
}, { timestamps: true });

module.exports = mongoose.model("UserInfo", UserInfo);
