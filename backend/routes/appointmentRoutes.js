const express = require('express');
const router = express.Router();
const { createAppointment, getMyAppointments, updateStatus } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Yeni randevu oluşturma yolu
router.post('/create', authMiddleware, createAppointment);

// Randevuları listeleme yolu
router.get('/my-appointments', authMiddleware, getMyAppointments);

// YENİ EKLENEN: Randevu durumunu güncelleme yolu
router.put('/:id/status', authMiddleware, updateStatus);

module.exports = router;