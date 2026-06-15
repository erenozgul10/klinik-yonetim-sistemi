const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User'); // Doktorları çekmek için modelimizi ekledik

// /api/auth/register yoluna gelirse register fonksiyonunu çalıştır
router.post('/register', register);

// /api/auth/login yoluna gelirse login fonksiyonunu çalıştır
router.post('/login', login);

// Sistemdeki Tüm Doktorları Getirme Rotası
router.get('/doktorlar', async (req, res) => {
  try {
    const doktorlar = await User.find({ rol: 'Doktor' }).select('isim bolum _id');
    res.status(200).json(doktorlar);
  } catch (error) {
    res.status(500).json({ mesaj: 'Doktorlar getirilemedi.' });
  }
});

module.exports = router;