import React, { useState, useEffect } from 'react';
import API from '../api';
import AppointmentTable from '../components/AppointmentTable';

const bolumler = ["KBB", "İç Hastalıkları", "Genel Cerrahi", "Nöroloji", "Kardiyoloji", "Üroloji", "Ortopedi", "Çocuk Hastalıkları"];

const Dashboard = () => {
  const [randevular, setRandevular] = useState([]);
  const [doktorlar, setDoktorlar] = useState([]); // Sistemdeki tüm doktorlar
  const [secilenBolum, setSecilenBolum] = useState(''); // Formdaki ilk seçim
  const [yeniRandevu, setYeniRandevu] = useState({ doktorId: '', tarih: '', notlar: '' });
  
  const rol = localStorage.getItem('rol');

  useEffect(() => {
    const fetchData = async () => {
      // 1. İŞLEM: Doktorları KESİNLİKLE çek (Hata verse bile diğerini etkilemez)
      try {
        const doktorRes = await API.get('/auth/doktorlar');
        setDoktorlar(doktorRes.data);
      } catch (error) {
        console.error('Doktorları çekerken hata:', error);
      }

      // 2. İŞLEM: Randevuları çek
      try {
        const randevuRes = await API.get('/appointments/my-appointments');
        // Eğer randevu yoksa boş dizi ata ki sistem çökmesin
        setRandevular(randevuRes.data.randevular || []); 
      } catch (error) {
        console.error('Randevuları çekerken hata:', error);
        setRandevular([]); // Hata durumunda tablo boş kalsın
      }
    };
    fetchData();
  }, []);

  // Normal input değişimleri
  const handleChange = (e) => setYeniRandevu({ ...yeniRandevu, [e.target.name]: e.target.value });

  // Bölüm değiştiğinde çalışacak özel fonksiyon (Doktor sıfırlanır)
  const handleBolumDegisimi = (e) => {
    setSecilenBolum(e.target.value);
    setYeniRandevu({ ...yeniRandevu, doktorId: '' }); // Yeni bölüm seçilince eski doktor silinir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!yeniRandevu.doktorId) {
      return alert('Lütfen önce Bölüm, ardından bir Doktor seçiniz!');
    }
    
    try {
      await API.post('/appointments/create', yeniRandevu);
      alert('Randevu başarıyla oluşturuldu!');
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.mesaj || 'Randevu oluşturulamadı.');
    }
  };

  // Sadece seçilen bölüme ait doktorları filtrele
  const filtrelenmisDoktorlar = doktorlar.filter(d => d.bolum === secilenBolum);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary fw-bold">Klinik Yönetim Paneli</h2>
      <div className="row">
        
        {/* SADECE HASTALAR İÇİN: Profesyonel Randevu Formu */}
        {rol === 'Hasta' && (
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white"><h5 className="m-0">Yeni Randevu Al</h5></div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  
                  {/* ADIM 1: Bölüm Seçimi */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">1. Bölüm Seçiniz</label>
                    <select className="form-select border-primary" value={secilenBolum} onChange={handleBolumDegisimi} required>
                      <option value="">-- Listeden Seçin --</option>
                      {bolumler.map((b, index) => (
                        <option key={index} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* ADIM 2: Doktor Seçimi (Sadece Bölüm seçilince açılır) */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">2. Doktor Seçiniz</label>
                    <select 
                      name="doktorId" 
                      className="form-select border-primary" 
                      value={yeniRandevu.doktorId} 
                      onChange={handleChange} 
                      required
                      disabled={!secilenBolum} // Bölüm seçilmeden tıklanamaz
                    >
                      <option value="">{secilenBolum ? '-- Uzman Seçin --' : 'Önce bölüm seçin'}</option>
                      {filtrelenmisDoktorlar.map(doktor => (
                        <option key={doktor._id} value={doktor._id}>Dr. {doktor.isim}</option>
                      ))}
                    </select>
                    {secilenBolum && filtrelenmisDoktorlar.length === 0 && (
                      <small className="text-danger mt-1 d-block">Bu bölümde henüz kayıtlı doktor bulunmuyor.</small>
                    )}
                  </div>

                  <hr />

                  {/* ADIM 3: Tarih ve Notlar */}
                  <div className="mb-3">
                    <label className="form-label">3. Tarih ve Saat</label>
                    <input type="datetime-local" name="tarih" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Şikayetiniz</label>
                    <textarea name="notlar" className="form-control" rows="2" onChange={handleChange} placeholder="Kısaca belirtiniz..."></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-success w-100 py-2 fw-bold">Randevuyu Onayla</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* HASTA VE DOKTOR İÇİN: Tablo Componenti */}
        <div className={rol === 'Hasta' ? "col-md-8" : "col-md-12"}>
          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white">
              <h5 className="m-0">{rol === 'Doktor' ? 'Randevu Takvimi' : 'Randevu Geçmişim'}</h5>
            </div>
            <div className="card-body p-0">
              <AppointmentTable randevular={randevular} rol={rol} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;