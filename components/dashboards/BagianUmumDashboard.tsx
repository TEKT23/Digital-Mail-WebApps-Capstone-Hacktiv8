'use client';

import { useState } from 'react';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  FileText,
  Filter,
  Plus,
  ArrowUp,
  ArrowDown,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';

export default function BagianUmumDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    {
      title: 'Surat Masuk Hari Ini',
      value: '12',
      change: '+3',
      changeType: 'increase',
      percentage: '+25%',
      icon: <Mail className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Surat Keluar',
      value: '8',
      change: '+2',
      changeType: 'increase',
      percentage: '+33%',
      icon: <Send className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Menunggu Proses',
      value: '15',
      change: '-1',
      changeType: 'decrease',
      percentage: '-6%',
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Selesai Diproses',
      value: '45',
      change: '+5',
      changeType: 'increase',
      percentage: '+12%',
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const recentDocuments = [
    {
      id: 1,
      title: 'Surat Permohonan Cuti Tahunan',
      sender: 'Ahmad Sutrisno',
      date: '2025-01-23',
      status: 'pending',
      priority: 'normal',
      type: 'masuk'
    },
    {
      id: 2,
      title: 'Undangan Rapat Koordinasi',
      sender: 'Direktur',
      date: '2025-01-23',
      status: 'approved',
      priority: 'high',
      type: 'keluar'
    },
    {
      id: 3,
      title: 'Laporan Keuangan Bulanan',
      sender: 'Bagian Keuangan',
      date: '2025-01-22',
      status: 'draft',
      priority: 'normal',
      type: 'masuk'
    },
    {
      id: 4,
      title: 'Surat Pemberitahuan Kebijakan Baru',
      sender: 'ADC',
      date: '2025-01-22',
      status: 'approved',
      priority: 'high',
      type: 'keluar'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge status-pending">Menunggu</span>;
      case 'approved':
        return <span className="status-badge status-approved">Disetujui</span>;
      case 'rejected':
        return <span className="status-badge status-rejected">Ditolak</span>;
      case 'draft':
        return <span className="status-badge status-draft">Draft</span>;
      default:
        return <span className="status-badge status-draft">{status}</span>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Dashboard Bagian Umum</h1>
          <p className="text-neutral-600 mt-1">Kelola surat masuk dan keluar dengan efisien</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">7 Hari Terakhir</option>
            <option value="month">30 Hari Terakhir</option>
            <option value="quarter">3 Bulan Terakhir</option>
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Buat Surat</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`card border-l-4 ${stat.color} hover:shadow-lg transition-all duration-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="w-3 h-3 text-green-600" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-red-600" />
                  )}
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.percentage}
                  </span>
                  <span className="text-xs text-neutral-500">dari kemarin</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Documents and Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Documents */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-neutral-800">Dokumen Terbaru</h2>
                <p className="text-sm text-neutral-600">Aktivitas surat masuk dan keluar hari ini</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Lihat Semua
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div 
                  key={doc.id} 
                  className={`document-card p-4 border border-neutral-200 rounded-lg border-l-4 ${getPriorityColor(doc.priority)} hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-neutral-800">{doc.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          doc.type === 'masuk' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {doc.type === 'masuk' ? 'Masuk' : 'Keluar'}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-2">
                        Dari: {doc.sender}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-neutral-500">{doc.date}</span>
                        {getStatusBadge(doc.status)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Performance Overview */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Performa Minggu Ini</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Target Mingguan</span>
                <span className="font-semibold text-blue-600">85%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-xs text-neutral-600">Surat Selesai</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">1.2</p>
                  <p className="text-xs text-neutral-600">Hari Rata-rata</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Aksi Cepat</h2>
            <div className="space-y-3">
              <button className="w-full btn-primary text-left flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <div className="flex-1">
                  <span className="font-medium">Buat Surat Baru</span>
                  <p className="text-xs text-blue-100">Template siap pakai</p>
                </div>
              </button>
              <button className="w-full btn-secondary text-left flex items-center space-x-3">
                <FileText className="w-5 h-5" />
                <div className="flex-1">
                  <span className="font-medium">Template Surat</span>
                  <p className="text-xs text-neutral-500">15 template tersedia</p>
                </div>
              </button>
              <button className="w-full btn-secondary text-left flex items-center space-x-3">
                <TrendingUp className="w-5 h-5" />
                <div className="flex-1">
                  <span className="font-medium">Laporan Harian</span>
                  <p className="text-xs text-neutral-500">Export & analisis</p>
                </div>
              </button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Notifikasi & Alert</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Surat Menunggu Review</p>
                  <p className="text-xs text-blue-600">3 surat menunggu persetujuan</p>
                  <button className="text-xs text-blue-700 font-medium mt-1 hover:underline">
                    Lihat Detail →
                  </button>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Deadline Mendekati</p>
                  <p className="text-xs text-yellow-600">2 surat deadline hari ini</p>
                  <button className="text-xs text-yellow-700 font-medium mt-1 hover:underline">
                    Prioritaskan →
                  </button>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Target Tercapai</p>
                  <p className="text-xs text-green-600">Performa minggu ini excellent!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Ringkasan Cepat</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-neutral-700">Tim Aktif</span>
                </div>
                <span className="font-semibold text-blue-600">8/10</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-neutral-700">Meeting Hari Ini</span>
                </div>
                <span className="font-semibold text-green-600">3</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-neutral-700">Efisiensi</span>
                </div>
                <span className="font-semibold text-purple-600">94%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}