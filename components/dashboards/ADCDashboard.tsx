'use client';

import { useState } from 'react';
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle,
  BarChart3,
  Filter,
  Download,
  Calendar
} from 'lucide-react';

export default function ADCDashboard() {
  const [selectedView, setSelectedView] = useState('overview');

  const stats = [
    {
      title: 'Total Dokumen Bulan Ini',
      value: '127',
      change: '+12%',
      changeType: 'increase',
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Koordinasi Aktif',
      value: '8',
      change: '+2 baru',
      changeType: 'increase',
      icon: <Users className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Rata-rata Waktu Proses',
      value: '2.3 hari',
      change: '-0.5 hari',
      changeType: 'decrease',
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Tingkat Penyelesaian',
      value: '94%',
      change: '+3%',
      changeType: 'increase',
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const workflows = [
    {
      id: 1,
      title: 'Alur Persetujuan Cuti',
      department: 'Bagian Umum → ADC → Direktur',
      status: 'active',
      documents: 15,
      avgTime: '1.2 hari'
    },
    {
      id: 2,
      title: 'Proses Pengadaan Barang',
      department: 'Bagian Umum → ADC → Direktur',
      status: 'active',
      documents: 8,
      avgTime: '3.5 hari'
    },
    {
      id: 3,
      title: 'Laporan Keuangan',
      department: 'Keuangan → ADC → Direktur',
      status: 'review',
      documents: 4,
      avgTime: '2.1 hari'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Meneruskan surat permohonan cuti',
      user: 'Ahmad Sutrisno',
      timestamp: '2 jam yang lalu',
      status: 'completed'
    },
    {
      id: 2,
      action: 'Koordinasi revisi dokumen',
      user: 'Siti Rahayu',
      timestamp: '4 jam yang lalu',
      status: 'pending'
    },
    {
      id: 3,
      action: 'Menyelesaikan review laporan',
      user: 'Budi Santoso',
      timestamp: '6 jam yang lalu',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Dashboard ADC</h1>
          <p className="text-neutral-600 mt-1">Administrasi dan koordinasi dokumen</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Laporan</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Jadwal Koordinasi</span>
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
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-neutral-500">dari target</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Workflow Management */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-800">Manajemen Alur Kerja</h2>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Kelola Alur
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-neutral-800">{workflow.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          workflow.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {workflow.status === 'active' ? 'Aktif' : 'Review'}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">{workflow.department}</p>
                      <div className="flex items-center space-x-6 text-sm text-neutral-500">
                        <span>{workflow.documents} dokumen</span>
                        <span>Rata-rata: {workflow.avgTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance Chart */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Performa Minggu Ini</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Dokumen Diproses</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Koordinasi Selesai</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Target Bulanan</span>
                <span className="font-semibold">65%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Aktivitas Terbaru</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-800">{activity.action}</p>
                    <p className="text-xs text-neutral-600">{activity.user}</p>
                    <p className="text-xs text-neutral-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Statistik Cepat</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Dokumen Tertunda</span>
                <span className="font-semibold text-red-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Koordinasi Aktif</span>
                <span className="font-semibold text-blue-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Selesai Hari Ini</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}