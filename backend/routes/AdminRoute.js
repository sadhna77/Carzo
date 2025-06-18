const express = require('express');
const { AdminLogin, addAdmin } = require('../controllers/AdminControl');
const router = express.Router();











// Routes
router.post('/admin-login', AdminLogin);
router.post('/admin-signup',addAdmin)

module.exports = router;