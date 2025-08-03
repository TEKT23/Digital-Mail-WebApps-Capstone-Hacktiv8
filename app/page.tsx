'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Shield, Users, Bot, ArrowRight, CheckCircle, Clock, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const roles = [
    {
      id: 'bagian-umum',
      title: 'Bagian Umum',
      description: 'Pengelolaan surat masuk dan keluar',
      icon: <Mail className="w-8 h-8 text-blue-600" />,
      color: 'border-blue-200 hover:border-blue-400'
    },
    {
      id: 'adc',
      title: 'ADC',
      description: 'Administrasi dan koordinasi dokumen',
      icon: <Users className="w-8 h-8 text-green-600" />,
      color: 'border-green-200 hover:border-green-400'
    },
    {
      id: 'direktur',
      title: 'Direktur',
      description: 'Persetujuan dan pengambilan keputusan',
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      color: 'border-purple-200 hover:border-purple-400'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !credentials.username || !credentials.password) {
      toast.error('Silakan lengkapi semua field');
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      toast.success('Login berhasil!');
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('userName', credentials.username);
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-800">Sistem Penyuratan Digital</h1>
                <p className="text-sm text-neutral-600">Platform Manajemen Dokumen Terintegrasi</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <Bot className="w-4 h-4" />
              <span>AI Assistant Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                Selamat Datang
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Silakan pilih peran Anda dan masuk ke sistem penyuratan digital yang terintegrasi dengan AI assistant.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Pilih Peran Anda
                </label>
                <div className="grid gap-3">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedRole === role.id
                          ? 'border-blue-500 bg-blue-50'
                          : `bg-white ${role.color}`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {role.icon}
                        <div>
                          <h3 className="font-semibold text-neutral-800">{role.title}</h3>
                          <p className="text-sm text-neutral-600">{role.description}</p>
                        </div>
                        {selectedRole === role.id && (
                          <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Masukkan username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Masukkan password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Sistem</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-neutral-500">
                Demo credentials: username: <code className="bg-neutral-100 px-2 py-1 rounded">demo</code>, password: <code className="bg-neutral-100 px-2 py-1 rounded">demo123</code>
              </p>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">Fitur Utama</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-800">Manajemen Dokumen Digital</h4>
                    <p className="text-sm text-neutral-600">Kelola surat masuk dan keluar dengan sistem digital terintegrasi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-800">Workflow Otomatis</h4>
                    <p className="text-sm text-neutral-600">Proses persetujuan dan routing dokumen yang efisien</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bot className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-800">AI Assistant</h4>
                    <p className="text-sm text-neutral-600">Bantuan cerdas menggunakan IBM Granite model untuk panduan penggunaan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6" />
                <h3 className="text-lg font-bold">Keamanan Terjamin</h3>
              </div>
              <p className="text-blue-100">
                Sistem dengan enkripsi end-to-end dan kontrol akses berbasis peran untuk menjamin keamanan dokumen Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}