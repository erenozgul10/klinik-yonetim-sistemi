import React from 'react';
import API from '../api';

const AppointmentTable = ({ randevular, rol }) => {
  
  const getDurumRozeti = (durum) => {
    switch (durum) {
      case 'Bekliyor': return <span className="badge bg-warning text-dark px-3 py-2 shadow-sm">⏳ Bekliyor</span>;
      case 'Onaylandı': return <span className="badge bg-success px-3 py-2 shadow-sm">✅ Onaylandı</span>;
      case 'İptal': return <span className="badge bg-danger px-3 py-2 shadow-sm">❌ İptal Edildi</span>;
      default: return <span className="badge bg-secondary">{durum}</span>;
    }
  };

  // Yeni Eklenen Onaylama Fonksiyonu
  const handleDurumDegistir = async (id, yeniDurum) => {
    if(!window.confirm(`Randevuyu ${yeniDurum} olarak işaretlemek istediğinize emin misiniz?`)) return;
    
    try {
      await API.put(`/appointments/${id}/status`, { durum: yeniDurum });
      window.location.reload(); // Değişikliği anında görmek için sayfayı yenile
    } catch (error) {
      alert('Durum güncellenirken bir hata oluştu.');
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped text-center align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>Tarih & Saat</th>
            {rol === 'Hasta' ? <th>Doktor Adı</th> : <th>Hasta Adı</th>}
            {rol === 'Hasta' && <th>Bölüm</th>}
            <th>Notlar</th>
            <th>Durum</th>
            {rol === 'Doktor' && <th>İşlemler</th>} {/* Sadece Doktor İşlem Yapabilir */}
          </tr>
        </thead>
        <tbody>
          {randevular.length > 0 ? (
            randevular.map((randevu, index) => (
              <tr key={index}>
                <td className="fw-bold text-secondary">{new Date(randevu.tarih).toLocaleString('tr-TR')}</td>
                {rol === 'Hasta' ? (
                  <>
                    <td>Dr. {randevu.doktor?.isim || 'Bilinmiyor'}</td>
                    <td>{randevu.doktor?.bolum || '-'}</td>
                  </>
                ) : (
                  <td className="fw-bold">{randevu.hasta?.isim || 'Bilinmiyor'}</td>
                )}
                <td className="text-muted fst-italic">{randevu.notlar ? randevu.notlar : '-'}</td>
                <td>{getDurumRozeti(randevu.durum)}</td>
                
                {/* DOKTOR İÇİN AKSİYON BUTONLARI */}
                {rol === 'Doktor' && (
                  <td>
                    {randevu.durum === 'Bekliyor' ? (
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-sm btn-success fw-bold" onClick={() => handleDurumDegistir(randevu._id, 'Onaylandı')}>✓ Onayla</button>
                        <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => handleDurumDegistir(randevu._id, 'İptal')}>✕ İptal</button>
                      </div>
                    ) : (
                      <span className="text-muted small">İşlem Tamamlandı</span>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" className="text-muted py-4">Henüz kayıtlı randevu bulunmamaktadır.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;