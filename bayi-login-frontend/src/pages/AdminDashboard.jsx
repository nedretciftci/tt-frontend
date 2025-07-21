import React from "react";

const AdminDashboard = () => (
  <div style={{ padding: '100px 32px 32px 32px' }}>
    <h1>Admin Dashboard</h1>
    <p>Hoş geldiniz, sistem yöneticisi!</p>
    <div style={{ marginTop: 32 }}>
      <h2>Kullanıcı Yönetimi</h2>
      <ul>
        <li>Kullanıcı ekle/sil/güncelle</li>
        <li>Kullanıcı listesi</li>
      </ul>
      <h2>Raporlar & İstatistikler</h2>
      <ul>
        <li>Genel sistem raporları</li>
        <li>Aktif kullanıcılar</li>
      </ul>
      <h2>Sistem Ayarları</h2>
      <ul>
        <li>Bildirim ayarları</li>
        <li>Güvenlik seçenekleri</li>
      </ul>
      <h2>Son Giriş Yapanlar</h2>
      <div style={{ background: '#f6f7fa', padding: 16, borderRadius: 8, color: '#888' }}>
        (Burada son giriş yapan kullanıcılar listelenecek)
      </div>
    </div>
  </div>
);

export default AdminDashboard;