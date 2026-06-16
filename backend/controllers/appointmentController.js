const Appointment = require('../models/Appointment');

// YENİ RANDEVU OLUŞTURMA
exports.createAppointment = async (req, res) => {
  try {
    const { doktorId, tarih, notlar } = req.body;
    const hastaId = req.user.id; // Giriş yapan hastanın ID'sini tokenden otomatik alıyoruz

    const yeniRandevu = await Appointment.create({
      hasta: hastaId,
      doktor: doktorId,
      tarih,
      notlar
    });

    res.status(201).json({ mesaj: 'Randevu başarıyla oluşturuldu!', randevu: yeniRandevu });
  } catch (error) {
    res.status(500).json({ mesaj: 'Sunucu hatası', hata: error.message });
  }
};

// RANDEVULARI LİSTELEME
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const rol = req.user.rol;
    let randevular;

    if (rol === 'Hasta') {
      // Hasta giriş yaptıysa, kendi aldığı randevuları getir ve TARİHE GÖRE SIRALA
      randevular = await Appointment.find({ hasta: userId })
        .populate('doktor', 'isim bolum')
        .sort({ tarih: 1 });
    } else if (rol === 'Doktor') {
      // Doktor giriş yaptıysa, kendisine alınan randevuları getir ve TARİHE GÖRE SIRALA
      randevular = await Appointment.find({ doktor: userId })
        .populate('hasta', 'isim')
        .sort({ tarih: 1 });
    } else {
      // Admin ise hepsini görebilir ve TARİHE GÖRE SIRALA
      randevular = await Appointment.find()
        .populate('hasta', 'isim')
        .populate('doktor', 'isim bolum')
        .sort({ tarih: 1 });
    }

    res.status(200).json({ randevular });
  } catch (error) {
    res.status(500).json({ mesaj: 'Randevular getirilemedi.', hata: error.message });
  }
};