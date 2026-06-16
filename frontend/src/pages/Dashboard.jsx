import React, { useState, useEffect } from 'react';
import API from '../api';
import AppointmentTable from '../components/AppointmentTable';

const bolumler = ["KBB", "İç Hastalıkları", "Genel Cerrahi", "Nöroloji", "Kardiyoloji", "Üroloji", "Ortopedi", "Çocuk Hastalıkları"];

const Dashboard = () => {
  const [randevular, setRandevular] = useState([]);
  const [doktorlar, setDoktorlar] = useState([]);
  const [secilenBolum, setSecilenBolum] = useState('');
  const [yeniRandevu, setYeniRandevu] = useState({ doktorId: '', tarih: '', notlar: '' });
  const [yukleniyor, setYukleniyor] = useState(true); 
  
  const rol = localStorage.getItem('rol');

  useEffect(() => {
    const fetchData = async () => {
      setYukleniyor(true);
      try {
        const doktorRes = await API.get('/auth/doktorlar');
        setDoktorlar(doktorRes.data);
      } catch (error) {
        console.error('Doktorları çekerken hata:', error);
      }

      try {
        const randevuRes = await API.get('/appointments/my-appointments');
        setRandevular(randevuRes.data.randevular || []); 
      } catch (error) {
        setRandevular([]); 
      } finally {
        setYukleniyor(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => setYeniRandevu({ ...yeniRandevu, [e.target.name]: e.target.value });

  const handleBolumDegisimi = (e) => {
    setSecilenBolum(e.target.value);
    setYeniRandevu({ ...yeniRandevu, doktorId: '' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!yeniRandevu.doktorId) {
      return alert('⚠️ Lütfen önce Bölüm, ardından bir Doktor seçiniz!'); 
    }
    
    try {
      await API.post('/appointments/create', yeniRandevu);
      alert('✅ Randevu başarıyla oluşturuldu!'); 
      
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      alert('❌ ' + (error.response?.data?.mesaj || 'Randevu oluşturulamadı.')); 
    }
  };

  const filtrelenmisDoktorlar = doktorlar.filter(d => d.bolum === secilenBolum);
  const bugun = new Date().toISOString().slice(0, 16);

  if (yukleniyor) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}></div>
          <h4 className="mt-3 text-secondary">Veriler Yükleniyor...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 text-primary fw-bold">Klinik Yönetim Paneli</h2>
      <div className="row">
        {rol === 'Hasta' && (
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white"><h5 className="m-0">Yeni Randevu Al</h5></div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">1. Bölüm Seçiniz</label>
                    <select className="form-select border-primary" value={secilenBolum} onChange={handleBolumDegisimi} required>
                      <option value="">-- Listeden Seçin --</option>
                      {bolumler.map((b, index) => <option key={index} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">2. Doktor Seçiniz</label>
                    <select name="doktorId" className="form-select border-primary" value={yeniRandevu.doktorId} onChange={handleChange} required disabled={!secilenBolum}>
                      <option value="">{secilenBolum ? '-- Uzman Seçin --' : 'Önce bölüm seçin'}</option>
                      {filtrelenmisDoktorlar.map(doktor => <option key={doktor._id} value={doktor._id}>Dr. {doktor.isim}</option>)}
                    </select>
                    {secilenBolum && filtrelenmisDoktorlar.length === 0 && <small className="text-danger mt-1 d-block">Bu bölümde henüz kayıtlı doktor bulunmuyor.</small>}
                  </div>
                  <hr />
                  <div className="mb-3">
                    <label className="form-label">3. Tarih ve Saat</label>
                    <input type="datetime-local" name="tarih" className="form-control" onChange={handleChange} min={bugun} required />
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
        <div className={rol === 'Hasta' ? "col-md-8" : "col-md-12"}>
          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white"><h5 className="m-0">{rol === 'Doktor' ? 'Randevu Takvimi' : 'Randevu Geçmişim'}</h5></div>
            <div className="card-body p-0"><AppointmentTable randevular={randevular} rol={rol} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;