const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Ön yüzden (React) gelen şifreli kimliği (Token) alıyoruz
    let token = req.header('Authorization');
    
    if (!token) {
      return res.status(403).json({ mesaj: 'Erişim reddedildi. Lütfen giriş yapın.' });
    }

    // Eğer token 'Bearer ' kelimesiyle başlıyorsa onu temizle
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Token'ı çöz ve içindeki kullanıcı bilgisini (ID ve Rol) al
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Bu bilgiyi controller'da kullanacağız
    
    next(); // Her şey yolundaysa randevu işlemine (sonraki adıma) geçmesine izin ver
  } catch (error) {
    res.status(401).json({ mesaj: 'Oturum süresi dolmuş veya geçersiz. Lütfen tekrar giriş yapın.', hata: error.message });
  }
};

module.exports = authMiddleware;