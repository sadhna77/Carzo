const express = require("express");
const app = express();
const cors = require("cors");
const Vehicle = require("../models/Vehiclemodal");
app.use(cors()); // Allows cross-origin requests from frontend
app.use(express.json());

const AddVehicle = async (req, res) => {
  const {
    vehicleId,
    model,
    year,
    price,
    type,
    color,
    mileage,
    fuelType,
    stock,
    status,
    features,
    imageUrls,
  } = req.body;
  console.log(req.body);
  try {
    const vehicle = new Vehicle({
      vehicleId,
      model,
      year,
      price,
      type,
      color,
      mileage,
      fuelType,
      stock,
      status,
      features,
      imageUrls,
    });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Error saving vehicle", error });
  }
};


const getVehicle = async (req, res) => {
    try {
      const vehicles = await Vehicle.find(); // fetch all vehicles
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicles", error });
    }
  };


module.exports = { AddVehicle,getVehicle };
