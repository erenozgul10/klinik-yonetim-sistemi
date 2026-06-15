import React from 'react';

const AdminPanel = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="text-danger border-bottom pb-2">Sistem Yönetim Paneli (Admin)</h2>
          <p className="text-muted">Bu alandan sisteme yeni doktorlar ekleyebilir ve tüm istatistikleri görebilirsiniz.</p>
        </div>
        
        <div className="col-md-6 mb-3">
          <div className="card shadow border-danger">
            <div className="card-header bg-danger text-white fw-bold">Doktor Yönetimi</div>
            <div className="card-body text-center">
              <p>Sisteme yeni bir uzman eklemek için aşağıdaki butonu kullanın.</p>
              <button className="btn btn-outline-danger w-75">Yeni Doktor Ekle</button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow border-info">
            <div className="card-header bg-info text-white fw-bold">Sistem İstatistikleri</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Toplam Hasta <span className="badge bg-primary rounded-pill">12</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Toplam Doktor <span className="badge bg-success rounded-pill">4</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Bekleyen Randevular <span className="badge bg-warning text-dark rounded-pill">8</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;