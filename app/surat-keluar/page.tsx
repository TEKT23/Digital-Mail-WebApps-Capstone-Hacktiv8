'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Send, 
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
  ArrowRight,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

import { SuratKeluar } from '@/interface/suratKeluar';
import suratKeluarData from '@/data/suratKeluar';

export default function SuratKeluarPage() {
  const [userRole, setUserRole] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState<SuratKeluar | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    status: 'approved',
    catatan: ''
  });
  const [newSurat, setNewSurat] = useState({
    tujuan: '',
    perihal: '',
    isi: '',
    prioritas: 'normal',
    lampiran: false
  });
  const router = useRouter();

  const [suratKeluar] = useState<SuratKeluar[]>(suratKeluarData);

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
      'draft': { label: 'Draft', class: 'bg-gray-100 text-gray-800', icon: <Edit className="w-3 h-3" /> },
      'review': { label: 'Review', class: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
      'approved': { label: 'Disetujui', class: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
      'sent': { label: 'Terkirim', class: 'bg-blue-100 text-blue-800', icon: <Send className="w-3 h-3" /> }
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

  const handleCreateSurat = () => {
    if (!newSurat.tujuan || !newSurat.perihal || !newSurat.isi) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    
    toast.success('Surat berhasil dibuat');
    setShowCreateModal(false);
    setNewSurat({ tujuan: '', perihal: '', isi: '', prioritas: 'normal', lampiran: false });
  };

  const handleReview = (surat: SuratKeluar) => {
    setSelectedSurat(surat);
    setShowReviewModal(true);
  };

  const submitReview = () => {
    if (reviewData.status === 'rejected' && !reviewData.catatan) {
      toast.error('Mohon berikan catatan untuk penolakan');
      return;
    }
    
    const statusText = reviewData.status === 'approved' ? 'disetujui' : 'ditolak';
    toast.success(`Surat berhasil ${statusText}`);
    setShowReviewModal(false);
    setReviewData({ status: 'approved', catatan: '' });
  };

  const filteredSurat = suratKeluar.filter(surat => {
    const matchSearch = surat.tujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            <h1 className="text-2xl font-bold text-neutral-800">Surat Keluar</h1>
            <p className="text-neutral-600">Kelola dan kirim surat keluar</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Surat</span>
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
                  placeholder="Cari berdasarkan tujuan, perihal, atau nomor surat..."
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
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="approved">Disetujui</option>
                <option value="sent">Terkirim</option>
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
                <div className="flex-1" onClick={() => router.push(`/surat-detail?id=${surat.id}`)}>
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
                      <span>Kepada: {surat.tujuan}</span>
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

                  <div className="flex items-center space-x-4 text-sm text-neutral-500">
                    <span>Pembuat: {surat.pembuat}</span>
                    {surat.reviewer && <span>Reviewer: {surat.reviewer}</span>}
                    {surat.tanggalKirim && <span>Dikirim: {surat.tanggalKirim}</span>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {(userRole === 'direktur' || userRole === 'adc') && surat.status === 'review' && (
                    <button 
                      onClick={() => handleReview(surat)}
                      className="p-2 text-neutral-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Review"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  
                  {surat.status === 'draft' && (
                    <button 
                      className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  
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
            <Send className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-800 mb-2">Tidak ada surat ditemukan</h3>
            <p className="text-neutral-600">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>

      {/* Create Surat Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-800">Buat Surat Baru</h2>
              <p className="text-sm text-neutral-600 mt-1">Lengkapi informasi surat yang akan dibuat</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tujuan Surat
                </label>
                <input
                  type="text"
                  value={newSurat.tujuan}
                  onChange={(e) => setNewSurat(prev => ({ ...prev, tujuan: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan tujuan surat..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Perihal
                </label>
                <input
                  type="text"
                  value={newSurat.perihal}
                  onChange={(e) => setNewSurat(prev => ({ ...prev, perihal: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan perihal surat..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Isi Surat
                </label>
                <textarea
                  value={newSurat.isi}
                  onChange={(e) => setNewSurat(prev => ({ ...prev, isi: e.target.value }))}
                  rows={8}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tulis isi surat di sini..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Prioritas
                  </label>
                  <select
                    value={newSurat.prioritas}
                    onChange={(e) => setNewSurat(prev => ({ ...prev, prioritas: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="rendah">Rendah</option>
                    <option value="normal">Normal</option>
                    <option value="tinggi">Tinggi</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Lampiran
                  </label>
                  <div className="flex items-center space-x-3 pt-2">
                    <input
                      type="checkbox"
                      checked={newSurat.lampiran}
                      onChange={(e) => setNewSurat(prev => ({ ...prev, lampiran: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-neutral-700">Ada lampiran</span>
                  </div>
                </div>
              </div>

              {newSurat.lampiran && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Upload Lampiran
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-600">Klik untuk upload atau drag & drop file</p>
                    <p className="text-xs text-neutral-500 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-secondary"
              >
                Batal
              </button>
              <button
                onClick={handleCreateSurat}
                className="btn-primary"
              >
                Simpan Draft
              </button>
              <button
                onClick={handleCreateSurat}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Kirim untuk Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-800">Review Surat</h2>
              <p className="text-sm text-neutral-600 mt-1">{selectedSurat?.perihal}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Status Review
                </label>
                <select
                  value={reviewData.status}
                  onChange={(e) => setReviewData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="approved">Setujui</option>
                  <option value="rejected">Tolak</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Catatan Review
                </label>
                <textarea
                  value={reviewData.catatan}
                  onChange={(e) => setReviewData(prev => ({ ...prev, catatan: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Berikan catatan untuk review ini..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="btn-secondary"
              >
                Batal
              </button>
              <button
                onClick={submitReview}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  reviewData.status === 'approved' 
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {reviewData.status === 'approved' ? 'Setujui' : 'Tolak'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}