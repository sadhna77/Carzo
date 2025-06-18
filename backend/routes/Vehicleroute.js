

const express = require('express')
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const {AddVehicle} = require('../controllers/Vehicle')
const {getVehicle} = require('../controllers/Vehicle')


router.post('/vehicle',AddVehicle)
router.get('/vehicle',getVehicle)

module.exports = router;