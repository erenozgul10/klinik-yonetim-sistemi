import React from 'react';

const AppointmentTable = ({ randevular, rol }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Tarih & Saat</th>
            <th>{rol === 'Doktor' ? 'Hasta Adı' : 'Doktor Adı'}</th>
            <th>Durum</th>
            <th>Notlar</th>
          </tr>
        </thead>
        <tbody>
          {randevular.length > 0 ? (
            randevular.map((randevu) => (
              <tr key={randevu._id}>
                <td>{new Date(randevu.tarih).toLocaleString('tr-TR')}</td>
                <td className="fw-semibold">
                  {rol === 'Doktor' ? randevu.hasta?.isim : randevu.doktor?.isim || 'Bilinmiyor'}
                </td>
                <td>
                  <span className={`badge ${randevu.durum === 'Bekliyor' ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {randevu.durum}
                  </span>
                </td>
                <td className="text-muted">{randevu.notlar || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">Kayıtlı randevu bulunamadı.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;