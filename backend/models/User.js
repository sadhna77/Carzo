const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
    trim: true
  },
 
  password: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  profileImage: {
    type: String, // store image filename or URL
    
  },
}, { timestamps: true });


module.exports = mongoose.model("InternUser", userSchema);
