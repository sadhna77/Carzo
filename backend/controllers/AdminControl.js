const express = require('express');
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv');
dotenv.config();











const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = {};

  console.log(req.body)

  // --- Validations ---


  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (password.length < 8 ) {
    errors.password = " Must be 8+ chars ";
  }

  // If there are validation errors, send all of them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    
  
    const existingUser = await Admin.findOne({ email });
   
    
    if (existingUser) {
      
      return res.status(400).json({ message: 'User already exists,Please Login!' });
    }


    else{
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new Admin({
      name,
      email,
      password: hashedPassword
    });
  

    // Save user to database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Respond with token
    res.status(201).json({ token ,name});
  }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  try {
    // Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token
     res.status(200).json({
      token,
      profileImage:user.profileImage,
      name: user.name,  // 👈 user ka name
      email: user.email,
      message: "Login successful"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}















const uploadProfilepic = async (req, res) => {
  try {
    const { email } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `http://localhost:5001/${req.file.path.replace(/\\/g, "/")}`;
    
    const user = await Admin.findOneAndUpdate(
      { email },
      { profileImage: filePath },
      { new: true }
    );

    res.status(200).json({
      message: "Profile image uploaded successfully",
      imageUrl: user.profileImage,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};







module.exports = { addAdmin,AdminLogin};
