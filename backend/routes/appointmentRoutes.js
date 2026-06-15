const express = require('express');
const router = express.Router();
const { createAppointment, getMyAppointments } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware'); // Güvenlik kilidi (Sadece giriş yapanlar randevu alabilir)

// Yeni randevu oluşturma yolu
router.post('/create', authMiddleware, createAppointment);

// Randevuları listeleme yolu
router.get('/my-appointments', authMiddleware, getMyAppointments);

module.exports = router;