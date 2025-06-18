const express = require("express");
const Car = require("../models/Carschema");
const LikedCar = require('../models/LikedCar')
const mongoose = require('mongoose');










const LikeCar = async (req,res) => {
  const {carId,userId,likedCars} = req.body;
 
 
 

  const car = await Car.findById(carId);

    const alreadyLiked = car.likes.includes(userId);

    if (alreadyLiked) {
    car.likes.pull(userId); // remove like
  } else {
    car.likes.push(userId); // add like
  }

  await car.save();
  res.json({ likes: car.likes.length, liked : !alreadyLiked });
}


// 6844560a3056f5fac3c571f1
const getUserLikedCars = async (req, res) => {
  const { userId } = req.params;

  try {
    const likedCars = await Car.find({ likes: userId }); // userId array ke andar hona chahiye
   
    const cars = await Car.find();
    res.status(200).json({
    
      likedCars,cars
    });
  } catch (error) {
   
    res.status(500).json({ message: "Server Error" });
  }
};








module.exports = {LikeCar,getUserLikedCars};
