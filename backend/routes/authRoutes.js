const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// /api/auth/register yoluna gelirse register fonksiyonunu çalıştır
router.post('/register', register);

// /api/auth/login yoluna gelirse login fonksiyonunu çalıştır
router.post('/login', login);

module.exports = router;