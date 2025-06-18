const express = require("express");
const InternUser = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserInfo = require("../models/userInfo");

const dotenv = require("dotenv");
dotenv.config();

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = {};
  console.log(req.body);

  // --- Validations ---
  if (!/^[a-zA-Z ]{3,}$/.test(name)) {
    errors.name = "Invalid name. Use at least 3 letters, only alphabets.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (password.length < 8) {
    errors.password = " Must be 8+ chars ";
  }

  console.log(name, email, password);
  // If there are validation errors, send all of them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const existingUser = await InternUser.findOne({ email });
    console.log("tellll", existingUser);

    if (existingUser) {
      console.log("huu");

      return res.status(400).json({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new InternUser({
        name,
        email,
        password: hashedPassword,
      });

      console.log(newUser);
      // Save user to database
      await newUser.save();

      // Create JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const userId = newUser._id;
      // Respond with token
      res.status(201).json({ token, name, userId });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserInfo = async (req, res) => {
 
 
  const {userId,...updates} = req.body; // chahe 1 field ho ya 4, yahi handle karega
 
   

  try {
    const updated = await UserInfo.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    );

   

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User info updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Find user by email
    const user = await InternUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userId = user._id;

    // Respond with token
    res.status(200).json({
      userId,
      token,
      profileImage: user.profileImage,
      name: user.name, // 👈 user ka name
      email: user.email,
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const AddUserInfo = async (req, res) => {
  const { fullname, contact, age, address, userId } = req.body;

  try {

    // Check if info already exists for this userId
    const existingInfo = await UserInfo.findOne({ userId });

    if (existingInfo) {
      return res.status(404).json({ message: "Info already exists for this user." });
    }

    const userInfo = new UserInfo({
      userId,
      fullname,
      contact,
      age,
      address,
    });

    await userInfo.save();

    res.status(200).json({
      fullname,
      age,
      address,
      contact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadProfilepic = async (req, res) => {
  // console.log( "image",req.body)
  try {
    const { email } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `http://localhost:5001/${req.file.path.replace(
      /\\/g,
      "/"
    )}`;

    const user = await InternUser.findOneAndUpdate(
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

const UserInfoFetch = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserInfo.findOne({ userId }).populate(
      "userId",
      "email name  profileImage"
    );
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addUser,
  Login,
  uploadProfilepic,
  UserInfoFetch,
  AddUserInfo,
  updateUserInfo
};
