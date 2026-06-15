const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// KULLANICI KAYIT OLMA (REGISTER)
exports.register = async (req, res) => {
  try {
    const { isim, email, sifre, rol } = req.body;
    
    // Email daha önce kullanılmış mı kontrol et
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ mesaj: 'Bu email zaten kullanımda.' });

    // Yeni kullanıcı oluştur (Şifre modelde otomatik hash'lenecek)
    const user = await User.create({ isim, email, sifre, rol });

    res.status(201).json({ mesaj: 'Kullanıcı başarıyla oluşturuldu', user });
  } catch (error) {
    res.status(500).json({ mesaj: 'Sunucu hatası', hata: error.message });
  }
};

// KULLANICI GİRİŞ YAPMA (LOGIN)
exports.login = async (req, res) => {
  try {
    const { email, sifre } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ mesaj: 'Kullanıcı bulunamadı.' });

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(sifre, user.sifre);
    if (!isMatch) return res.status(400).json({ mesaj: 'Geçersiz şifre.' });

    // Token Oluştur (Gizli anahtarla imzala)
    const token = jwt.sign(
      { id: user._id, rol: user.rol }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // Token 1 gün geçerli
    );

    res.status(200).json({ mesaj: 'Giriş başarılı', token, rol: user.rol });
  } catch (error) {
    res.status(500).json({ mesaj: 'Sunucu hatası', hata: error.message });
  }
};