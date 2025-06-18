const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    
        vehicleId: String,
        model: String,
        year: Number,
        price: Number,
        type: String, // sedan, SUV, etc.
        color: String,
        mileage: Number,
        fuelType: String,
        stock: Number,
        status: { type: String, enum: ['available', 'sold'], default: 'available' },
        features: [String],
        imageUrls: [String],
        createdAt: Date
    
})

module.exports = mongoose.model("Vehicle", VehicleSchema);
