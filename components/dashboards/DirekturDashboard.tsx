'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Calendar,
  Download
} from 'lucide-react';

export default function DirekturDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const executiveStats = [
    {
      title: 'Total Keputusan Bulan Ini',
      value: '47',
      change: '+8%',
      changeType: 'increase',
      icon: <Award className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Dokumen Menunggu',
      value: '5',
      change: 'Urgent',
      changeType: 'warning',
      icon: <Clock className="w-8 h-8 text-red-600" />,
      color: 'bg-red-50 border-red-200'
    },
    {
      title: 'Efisiensi Proses',
      value: '92%',
      change: '+5%',
      changeType: 'increase',
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Tim Aktif',
      value: '24',
      change: '100%',
      changeType: 'stable',
      icon: <Users className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      title: 'Permohonan Anggaran Proyek IT',
      department: 'Bagian IT',
      amount: 'Rp 150.000.000',
      priority: 'high',
      submitDate: '2025-01-23',
      deadline: '2025-01-25'
    },
    {
      id: 2,
      title: 'Kebijakan Kerja Remote',
      department: 'HR',
      amount: '-',
      priority: 'medium',
      submitDate: '2025-01-22',
      deadline: '2025-01-30'
    },
    {
      id: 3,
      title: 'Kontrak Vendor Catering',
      department: 'Bagian Umum',
      amount: 'Rp 25.000.000',
      priority: 'normal',
      submitDate: '2025-01-21',
      deadline: '2025-01-28'
    }
  ];

  const departmentPerformance = [
    {
      name: 'Bagian Umum',
      completed: 95,
      pending: 3,
      efficiency: 92
    },
    {
      name: 'ADC',
      completed: 88,
      pending: 5,
      efficiency: 89
    },
    {
      name: 'Keuangan',
      completed: 97,
      pending: 2,
      efficiency: 96
    },
    {
      name: 'IT',
      completed: 85,
      pending: 8,
      efficiency: 87
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'normal':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Tinggi';
      case 'medium':
        return 'Sedang';
      case 'normal':
        return 'Normal';
      default:
        return priority;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Dashboard Direktur</h1>
          <p className="text-neutral-600 mt-1">Monitoring eksekutif dan pengambilan keputusan strategis</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="quarter">Kuartal Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analitik</span>
          </button>
        </div>
      </div>

      {/* Executive Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executiveStats.map((stat, index) => (
          <div key={index} className={`card border-l-4 ${stat.color} hover:shadow-lg transition-all duration-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'warning' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {stat.changeType === 'warning' ? '' : 'dari target'}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pending Approvals */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold text-neutral-800">Persetujuan Tertunda</h2>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  {pendingApprovals.length} item
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Lihat Semua
              </button>
            </div>
            
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(item.priority)} transition-all hover:shadow-md cursor-pointer`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-neutral-800">{item.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.priority === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : item.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {getPriorityText(item.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-2">{item.department}</p>
                      {item.amount !== '-' && (
                        <p className="text-sm font-medium text-neutral-800 mb-2">{item.amount}</p>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-neutral-500">
                        <span>Diajukan: {item.submitDate}</span>
                        <span>Deadline: {item.deadline}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="btn-secondary text-sm px-3 py-1">
                        Review
                      </button>
                      <button className="btn-primary text-sm px-3 py-1">
                        Setujui
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
          {/* Department Performance */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Performa Departemen</h2>
            <div className="space-y-4">
              {departmentPerformance.map((dept, index) => (
                <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-neutral-800">{dept.name}</span>
                    <span className="text-sm font-semibold text-green-600">{dept.efficiency}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-600 mb-2">
                    <span>Selesai: {dept.completed}</span>
                    <span>Tertunda: {dept.pending}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{width: `${dept.efficiency}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Metrik Kunci</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Dokumen Disetujui</span>
                </div>
                <span className="font-bold text-green-600">47</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium">Rata-rata Waktu</span>
                </div>
                <span className="font-bold text-yellow-600">1.2 hari</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Total Dokumen</span>
                </div>
                <span className="font-bold text-blue-600">127</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Aksi Cepat</h2>
            <div className="space-y-3">
              <button className="w-full btn-primary text-left flex items-center space-x-3">
                <Calendar className="w-5 h-5" />
                <span>Jadwal Meeting</span>
              </button>
              <button className="w-full btn-secondary text-left flex items-center space-x-3">
                <BarChart3 className="w-5 h-5" />
                <span>Laporan Eksekutif</span>
              </button>
              <button className="w-full btn-secondary text-left flex items-center space-x-3">
                <AlertCircle className="w-5 h-5" />
                <span>Alert & Notifikasi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}