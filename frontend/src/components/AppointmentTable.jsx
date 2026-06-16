import React from 'react';

const AppointmentTable = ({ randevular, rol }) => {
  
  // Duruma göre renkli Bootstrap rozeti (Badge) döndüren fonksiyon
  const getDurumRozeti = (durum) => {
    switch (durum) {
      case 'Bekliyor': 
        return <span className="badge bg-warning text-dark px-3 py-2">⏳ Bekliyor</span>;
      case 'Onaylandı': 
        return <span className="badge bg-success px-3 py-2">✅ Onaylandı</span>;
      case 'İptal': 
        return <span className="badge bg-danger px-3 py-2">❌ İptal Edildi</span>;
      default: 
        return <span className="badge bg-secondary">{durum}</span>;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped text-center align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Tarih & Saat</th>
            {rol === 'Hasta' ? <th>Doktor Adı</th> : <th>Hasta Adı</th>}
            {rol === 'Hasta' && <th>Bölüm</th>}
            <th>Notlar</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {randevular.length > 0 ? (
            randevular.map((randevu, index) => (
              <tr key={index}>
                <td className="fw-bold text-secondary">
                  {new Date(randevu.tarih).toLocaleString('tr-TR')}
                </td>
                
                {/* Hastaysa doktoru göster, doktorsa hastayı göster */}
                {rol === 'Hasta' ? (
                  <>
                    <td>Dr. {randevu.doktor?.isim || 'Bilinmiyor'}</td>
                    <td>{randevu.doktor?.bolum || '-'}</td>
                  </>
                ) : (
                  <td className="fw-bold">{randevu.hasta?.isim || 'Bilinmiyor'}</td>
                )}

                <td className="text-muted fst-italic">
                  {randevu.notlar ? randevu.notlar : '-'}
                </td>
                
                {/* Rozetli Durum Gösterimi */}
                <td>{getDurumRozeti(randevu.durum)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-muted py-4">
                Henüz kayıtlı randevu bulunmamaktadır.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;