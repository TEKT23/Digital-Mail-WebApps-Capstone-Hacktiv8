'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Mail, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Plus,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SuratMasuk {
  id: string;
  nomor: string;
  pengirim: string;
  perihal: string;
  tanggalTerima: string;
  tanggalSurat: string;
  status: 'baru' | 'dibaca' | 'disposisi' | 'selesai';
  prioritas: 'rendah' | 'normal' | 'tinggi' | 'urgent';
  lampiran: boolean;
  disposisiKe?: string;
  catatan?: string;
}

export default function SuratMasukPage() {
  const [userRole, setUserRole] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [selectedSurat, setSelectedSurat] = useState<SuratMasuk | null>(null);
  const [showDisposisi, setShowDisposisi] = useState(false);
  const [disposisiData, setDisposisiData] = useState({
    tujuan: '',
    instruksi: '',
    batasWaktu: '',
    prioritas: 'normal'
  });
  const router = useRouter();

  const [suratMasuk] = useState<SuratMasuk[]>([
    {
      id: '1',
      nomor: 'SM/001/2025',
      pengirim: 'PT. Teknologi Maju',
      perihal: 'Permohonan Kerjasama Pengembangan Sistem',
      tanggalTerima: '2025-01-23',
      tanggalSurat: '2025-01-20',
      status: 'baru',
      prioritas: 'tinggi',
      lampiran: true
    },
    {
      id: '2',
      nomor: 'SM/002/2025',
      pengirim: 'Dinas Pendidikan Kota',
      perihal: 'Undangan Rapat Koordinasi Pendidikan',
      tanggalTerima: '2025-01-23',
      tanggalSurat: '2025-01-22',
      status: 'dibaca',
      prioritas: 'normal',
      lampiran: false,
      disposisiKe: 'ADC'
    },
    {
      id: '3',
      nomor: 'SM/003/2025',
      pengirim: 'Ahmad Sutrisno',
      perihal: 'Permohonan Cuti Tahunan',
      tanggalTerima: '2025-01-22',
      tanggalSurat: '2025-01-22',
      status: 'disposisi',
      prioritas: 'normal',
      lampiran: false,
      disposisiKe: 'Direktur'
    }
  ]);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (!role) {
      router.push('/');
      return;
    }
    setUserRole(role);
  }, [router]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'baru': { label: 'Baru', class: 'bg-blue-100 text-blue-800', icon: <Mail className="w-3 h-3" /> },
      'dibaca': { label: 'Dibaca', class: 'bg-yellow-100 text-yellow-800', icon: <Eye className="w-3 h-3" /> },
      'disposisi': { label: 'Disposisi', class: 'bg-purple-100 text-purple-800', icon: <ArrowRight className="w-3 h-3" /> },
      'selesai': { label: 'Selesai', class: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.icon}
        <span>{config.label}</span>
      </span>
    );
  };

  const getPrioritasBadge = (prioritas: string) => {
    const prioritasConfig = {
      'rendah': { label: 'Rendah', class: 'bg-gray-100 text-gray-800' },
      'normal': { label: 'Normal', class: 'bg-blue-100 text-blue-800' },
      'tinggi': { label: 'Tinggi', class: 'bg-orange-100 text-orange-800' },
      'urgent': { label: 'Urgent', class: 'bg-red-100 text-red-800' }
    };
    
    const config = prioritasConfig[prioritas as keyof typeof prioritasConfig];
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const handleDisposisi = (surat: SuratMasuk) => {
    setSelectedSurat(surat);
    setShowDisposisi(true);
  };

  const submitDisposisi = () => {
    if (!disposisiData.tujuan || !disposisiData.instruksi) {
      toast.error('Mohon lengkapi data disposisi');
      return;
    }
    
    toast.success('Disposisi berhasil dikirim');
    setShowDisposisi(false);
    setDisposisiData({ tujuan: '', instruksi: '', batasWaktu: '', prioritas: 'normal' });
  };

  const filteredSurat = suratMasuk.filter(surat => {
    const matchSearch = surat.pengirim.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       surat.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       surat.nomor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchFilter = filterStatus === 'semua' || surat.status === filterStatus;
    
    return matchSearch && matchFilter;
  });

  if (!userRole) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Surat Masuk</h1>
            <p className="text-neutral-600">Kelola dan proses surat masuk</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Input Surat</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan pengirim, perihal, atau nomor surat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="semua">Semua Status</option>
                <option value="baru">Baru</option>
                <option value="dibaca">Dibaca</option>
                <option value="disposisi">Disposisi</option>
                <option value="selesai">Selesai</option>
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Surat List */}
        <div className="space-y-4">
          {filteredSurat.map((surat) => (
            <div key={surat.id} className="card hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-neutral-800">{surat.perihal}</h3>
                    {getStatusBadge(surat.status)}
                    {getPrioritasBadge(surat.prioritas)}
                    {surat.lampiran && (
                      <span className="inline-flex items-center space-x-1 text-xs text-neutral-500">
                        <FileText className="w-3 h-3" />
                        <span>Lampiran</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600 mb-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Dari: {surat.pengirim}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Tanggal: {surat.tanggalSurat}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>No: {surat.nomor}</span>
                    </div>
                  </div>

                  {surat.disposisiKe && (
                    <div className="flex items-center space-x-2 text-sm text-purple-600 mb-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Didisposisi ke: {surat.disposisiKe}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {(userRole === 'bagian-umum' || userRole === 'direktur') && surat.status !== 'selesai' && (
                    <button 
                      onClick={() => handleDisposisi(surat)}
                      className="p-2 text-neutral-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Disposisi"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button 
                    className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button 
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSurat.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-800 mb-2">Tidak ada surat ditemukan</h3>
            <p className="text-neutral-600">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>

      {/* Disposisi Modal */}
      {showDisposisi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-800">Disposisi Surat</h2>
              <p className="text-sm text-neutral-600 mt-1">{selectedSurat?.perihal}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Disposisi Kepada
                </label>
                <select
                  value={disposisiData.tujuan}
                  onChange={(e) => setDisposisiData(prev => ({ ...prev, tujuan: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih tujuan disposisi</option>
                  <option value="ADC">ADC</option>
                  <option value="Direktur">Direktur</option>
                  <option value="Bagian Keuangan">Bagian Keuangan</option>
                  <option value="Bagian IT">Bagian IT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Instruksi/Catatan
                </label>
                <textarea
                  value={disposisiData.instruksi}
                  onChange={(e) => setDisposisiData(prev => ({ ...prev, instruksi: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Berikan instruksi atau catatan untuk disposisi ini..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Batas Waktu
                </label>
                <input
                  type="date"
                  value={disposisiData.batasWaktu}
                  onChange={(e) => setDisposisiData(prev => ({ ...prev, batasWaktu: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Prioritas
                </label>
                <select
                  value={disposisiData.prioritas}
                  onChange={(e) => setDisposisiData(prev => ({ ...prev, prioritas: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="normal">Normal</option>
                  <option value="tinggi">Tinggi</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDisposisi(false)}
                className="btn-secondary"
              >
                Batal
              </button>
              <button
                onClick={submitDisposisi}
                className="btn-primary"
              >
                Kirim Disposisi
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}