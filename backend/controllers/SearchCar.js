const express = require("express");
const Car = require("../models/Carschema");

const dotenv = require("dotenv");
dotenv.config();

const SearchCar = async (req, res) => {
  const { name, price, type } = req.body;
  console.log(req.body);

   try {
    // Dynamically build query object
    const query = {
      name: { $regex: name, $options: "i" }, // case-insensitive partial match
      price: { $lte: price } // price less than or equal to given
    };

    

    if (type) {
      query.type = type; // only add if type is selected
    }

    // Run the search query
    const cars = await Car.find(query);
    console.log(cars)

    res.status(200).json({ success: true, data: cars });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { SearchCar };
