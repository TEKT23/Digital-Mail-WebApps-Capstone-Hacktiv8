'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  User, 
  Bell, 
  Lock, 
  Save 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState('profil');

  // State for form inputs
  const [profileData, setProfileData] = useState({
    nama: 'Andi Wijaya',
    email: 'andi.wijaya@example.com',
    jabatan: 'Direktur Utama',
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    emailSuratBaru: true,
    emailDisposisi: true,
    pushNotif: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pengaturan profil berhasil disimpan!');
  };

  const handleNotificationSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Preferensi notifikasi berhasil diperbarui!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password baru tidak cocok!');
      return;
    }
    if (!passwordData.newPassword || !passwordData.currentPassword) {
      toast.error('Mohon isi semua field yang diperlukan.');
      return;
    }
    toast.success('Password berhasil diubah!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profil':
        return (
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                value={profileData.nama}
                onChange={(e) => setProfileData({...profileData, nama: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Alamat Email</label>
              <input 
                type="email" 
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Jabatan</label>
              <input 
                type="text" 
                value={profileData.jabatan}
                disabled
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 cursor-not-allowed"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        );
      case 'notifikasi':
        return (
          <form onSubmit={handleNotificationSave} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-800">Notifikasi Email</h3>
              <div className="flex items-center justify-between">
                <label htmlFor="emailSuratBaru" className="text-sm text-neutral-700">Email saat ada surat masuk baru</label>
                <input type="checkbox" id="emailSuratBaru" checked={notificationPrefs.emailSuratBaru} onChange={e => setNotificationPrefs({...notificationPrefs, emailSuratBaru: e.target.checked})} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="emailDisposisi" className="text-sm text-neutral-700">Email saat menerima disposisi</label>
                <input type="checkbox" id="emailDisposisi" checked={notificationPrefs.emailDisposisi} onChange={e => setNotificationPrefs({...notificationPrefs, emailDisposisi: e.target.checked})} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </div>
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="font-semibold text-neutral-800">Push Notification</h3>
               <div className="flex items-center justify-between">
                <label htmlFor="pushNotif" className="text-sm text-neutral-700">Aktifkan push notification di browser</label>
                <input type="checkbox" id="pushNotif" checked={notificationPrefs.pushNotif} onChange={e => setNotificationPrefs({...notificationPrefs, pushNotif: e.target.checked})} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="btn-primary flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Simpan Preferensi</span>
              </button>
            </div>
          </form>
        );
      case 'keamanan':
        return (
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Password Saat Ini</label>
              <input 
                type="password"
                value={passwordData.currentPassword}
                onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Password Baru</label>
              <input 
                type="password" 
                value={passwordData.newPassword}
                onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Konfirmasi Password Baru</label>
              <input 
                type="password" 
                value={passwordData.confirmPassword}
                onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Ubah Password</span>
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Pengaturan Akun</h1>
          <p className="text-neutral-600">Kelola informasi profil, notifikasi, dan keamanan akun Anda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tabs Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('profil')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'profil' ? 'bg-blue-100 text-blue-700' : 'hover:bg-neutral-100'
                }`}>
                <User className="w-5 h-5" />
                <span>Profil</span>
              </button>
              <button 
                onClick={() => setActiveTab('notifikasi')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'notifikasi' ? 'bg-blue-100 text-blue-700' : 'hover:bg-neutral-100'
                }`}>
                <Bell className="w-5 h-5" />
                <span>Notifikasi</span>
              </button>
              <button 
                onClick={() => setActiveTab('keamanan')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'keamanan' ? 'bg-blue-100 text-blue-700' : 'hover:bg-neutral-100'
                }`}>
                <Lock className="w-5 h-5" />
                <span>Keamanan</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="card p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
