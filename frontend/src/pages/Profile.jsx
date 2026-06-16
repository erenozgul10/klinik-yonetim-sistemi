import React from 'react';

const Profile = () => {
  const rol = localStorage.getItem('rol') || 'Kullanıcı';

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary fw-bold">Profilim</h2>
      
      <div className="row">
        {/* SOL TARAF: Kullanıcı Kartı */}
        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 text-center p-4">
            <div className="mb-3">
              <img 
                src={`https://ui-avatars.com/api/?name=${rol}&background=0D8ABC&color=fff&size=128`} 
                alt="Avatar" 
                className="rounded-circle shadow-sm"
              />
            </div>
            <h4 className="fw-bold mb-1">Hesap Sahibi</h4>
            <span className={`badge ${rol === 'Doktor' ? 'bg-success' : rol === 'Admin' ? 'bg-danger' : 'bg-primary'} px-3 py-2 mt-2`}>
              Yetki: {rol}
            </span>
            <hr className="my-4" />
            <p className="text-muted small mb-0">Sisteme kayıt tarihi: 2026</p>
          </div>
        </div>

        {/* SAĞ TARAF: Hesap Ayarları */}
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white fw-bold">
              Kişisel Bilgiler & Güvenlik
            </div>
            <div className="card-body p-4">
              
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label text-muted fw-bold">Ad Soyad</label>
                    <input type="text" className="form-control bg-light" value="Eren Özgül" disabled />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted fw-bold">E-Posta Adresi</label>
                    <input type="email" className="form-control bg-light" value="sistemde.kayitli@email.com" disabled />
                  </div>
                </div>

                {rol === 'Doktor' && (
                  <div className="mb-4">
                    <label className="form-label text-muted fw-bold">Uzmanlık Bölümü</label>
                    <input type="text" className="form-control bg-light" value="Kayıtlı Bölümünüz" disabled />
                  </div>
                )}

                <hr className="my-4" />
                <h5 className="fw-bold mb-3">Şifre Değiştirme</h5>
                
                <div className="mb-3">
                  <label className="form-label">Mevcut Şifre</label>
                  <input type="password" className="form-control" placeholder="Şu anki şifrenizi girin" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Yeni Şifre</label>
                  <input type="password" className="form-control" placeholder="Yeni şifre belirleyin" />
                </div>
                
                <button type="button" className="btn btn-primary px-4 fw-bold mt-2" onClick={() => alert("Bu özellik bir sonraki güncellemede aktif edilecektir.")}>
                  Bilgileri Kaydet
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;