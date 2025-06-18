// routes/carRoutes.js
const express = require("express");
const router = express.Router();
const Car = require("../models/Carschema");
const Carsdata = require("../car_dataset_unsplash.json"); // path to your JSON file
const { SearchCar } = require("../controllers/SearchCar");
const DEFAULT_IMAGE = "http://localhost:5001/public/images/default.jpg";


// Add all cars to DB (only once)
router.post("/add-all", async (req, res) => {
  console.log(req.body);
  try {
    await Car.insertMany(Carsdata);
    res.status(201).json({ message: "Cars added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// routes/carRoutes.js (add this too)
router.get("/fetchcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add car insert by admin
router.post("/add-car", async (req, res) => {
  const { name, type, mileage, price, fuel, transmission, image, feature } =
    req.body;
  console.log(req.body);
  const imageToUse = image && image.trim() !== "" ? image : DEFAULT_IMAGE;

  if (name == "") {
    return res.status(400).json({ message: "Carname is required" });
  }
  try {
    const newCar = new Car({
      name,
      type,
      mileage,
      price,
      fuel,
      transmission,
      image: imageToUse,
      feature,
    });
    await newCar.save();

    res.status(201).json({ message: "Cars added successfully!", car: newCar });
  } catch (error) {
    console.log("hiii");

    res.status(500).json({ error: error.message });
  }
});

router.get("/fetchcars-new", async (req, res) => {
  try {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const cars = await Car.find({
      createdAt: {
        $gte: oneMonthAgo,
        $lte: today,
      },
    });

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/edit-car/:id", async (req, res) => {
  try {
    const { name, type, price, image } = req.body;
    const carId = req.params.id;

    const imageToUse = image && image.trim() !== "" ? image : DEFAULT_IMAGE;

    const upDatecar = await Car.findByIdAndUpdate(
      carId,
      { name, type, price, image: imageToUse },
      { new: true }
    );
    if (!upDatecar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res
      .status(200)
      .json({ message: "Car updated successfully", car: upDatecar });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/edit-car/:id", async (req, res) => {
  try {
    const carId = req.params.id;

    const Deletecar = await Car.findByIdAndDelete(carId);
    if (!Deletecar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car Deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});








const {fetchAlreadyBuycar, OrderBuycar, DeleteOrder } = require("../controllers/BuyCar");
const { LikeCar, getUserLikedCars } = require("../controllers/LikeCar");


 
router.put('/liked-car',LikeCar)
router.get('/liked-byuser/:userId',getUserLikedCars)
router.post("/buy-car/:carId",OrderBuycar) 
router.delete("/delete/:carId",DeleteOrder) 
router.post("/alreadyBuy-car",fetchAlreadyBuycar) 

router.post("/search", SearchCar);

module.exports = router;
