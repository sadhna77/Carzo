const mongoose = require('mongoose')



  const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)  // Connects to MongoDB using the URI from `.env`
        .then(() => console.log("MongoDB Connected"))  // Logs a success message if connected
        
    } catch (error) {
        console.log("errror in connecting ",error)
        
    }
  }

  module.exports = connectDB;