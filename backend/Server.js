const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const path = require('path');



// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = require('./config/dbConnect')
connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve image files
app.use('/api', userRoutes);


// const VehicleRoute = require('./routes/Vehicleroute')
// app.use('/user',VehicleRoute)

app.use("/public", express.static(path.join(__dirname, "public")));

const Cardata = require('./routes/Cardata')
app.use('/api',Cardata)


// for admins 

const Admins = require('./routes/AdminRoute')
app.use('/admin',Admins)












// Set port
const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
