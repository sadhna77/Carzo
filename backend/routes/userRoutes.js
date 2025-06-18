const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addUser, Login, uploadProfilepic, UserInfoFetch, AddUserInfo, updateUserInfo} = require('../controllers/userControl');


const path = require("path");
const fs = require("fs");
const { ContactEmail } = require('../controllers/Contact');



// Setup multer to store image in "uploads/" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Create folder if not exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/uploadProfile", upload.single("profile"),uploadProfilepic)




// Routes
router.post('/signup', addUser);
router.post('/login',Login)
router.post('/contact',ContactEmail)
router.get('/user-info/:userId',UserInfoFetch)
router.post('/add-userinfo',AddUserInfo)
router.put('/update-userinfo',updateUserInfo)

module.exports = router;
