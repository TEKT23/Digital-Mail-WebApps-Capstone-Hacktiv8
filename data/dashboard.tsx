import { Stat, RecentDocument, Workflow, PendingApproval, DepartmentPerformance } from '@/interface/dashboard';
import { Mail, Send, Clock, CheckCircle, ArrowUp, ArrowDown, FileText, Users, Award, AlertCircle, BarChart3, Calendar, TrendingUp } from 'lucide-react';

export const bagianUmumStats: Stat[] = [
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

export const bagianUmumRecentDocuments: RecentDocument[] = [
  {
    id: '1',
    title: 'Surat Permohonan Cuti Tahunan',
    sender: 'Ahmad Sutrisno',
    date: '2025-01-23',
    status: 'pending',
    priority: 'normal',
    type: 'masuk'
  },
  {
    id: 'sk-01',
    title: 'Undangan Rapat Koordinasi',
    sender: 'Direktur',
    date: '2025-01-23',
    status: 'approved',
    priority: 'high',
    type: 'keluar'
  },
  {
    id: '3',
    title: 'Laporan Keuangan Bulanan',
    sender: 'Bagian Keuangan',
    date: '2025-01-22',
    status: 'draft',
    priority: 'normal',
    type: 'masuk'
  },
  {
    id: '4',
    title: 'Surat Pemberitahuan Kebijakan Baru',
    sender: 'ADC',
    date: '2025-01-22',
    status: 'approved',
    priority: 'high',
    type: 'keluar'
  }
];

export const adcStats: Stat[] = [
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

export const adcWorkflows: Workflow[] = [
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

export const adcRecentActivities: RecentDocument[] = [
  {
    id: 'act-1',
    action: 'Meneruskan surat permohonan cuti',
    user: 'Ahmad Sutrisno',
    timestamp: '2 jam yang lalu',
    status: 'completed'
  },
  {
    id: 'act-2',
    action: 'Koordinasi revisi dokumen',
    user: 'Siti Rahayu',
    timestamp: '4 jam yang lalu',
    status: 'pending'
  },
  {
    id: 'act-3',
    action: 'Menyelesaikan review laporan',
    user: 'Budi Santoso',
    timestamp: '6 jam yang lalu',
    status: 'completed'
  }
];

export const direkturExecutiveStats: Stat[] = [
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

export const direkturPendingApprovals: PendingApproval[] = [
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

export const direkturDepartmentPerformance: DepartmentPerformance[] = [
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
