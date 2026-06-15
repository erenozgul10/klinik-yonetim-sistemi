const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// .env dosyasındaki gizli ayarları yükle
dotenv.config();

const app = express();

// Middleware (Güvenlik ve veri okuma için)
app.use(cors());
app.use(express.json());

// Test API Ucu (Burası çalıştığını gösterecek)
app.get('/', (req, res) => {
  res.send('Klinik Yönetim Sistemi Backend API Basariyla Calisiyor!');
});

// --- EKLENEN ROTALAR ---

// 1. Kayıt ve Giriş İşlemleri
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 2. Randevu İşlemleri (Bunu yeni ekledik!)
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

// --------------------------------------------------

// Veritabanı (MongoDB) Bağlantısı
const baglan = async () => {
    try {
        // Geçici olarak strictQuery uyarısını kapatıyoruz
        mongoose.set('strictQuery', false); 
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB veritabanına başarıyla bağlanıldı!');
    } catch (err) {
        console.log('⚠️ MongoDB bağlantısı bekleniyor (Gerçek link girilmedi):', err.message);
    }
};

baglan();

// Sunucuyu Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);
});