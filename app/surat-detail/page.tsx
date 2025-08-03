'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Mail,
  CheckCircle,
  ArrowRight,
  Clock,
  Download,
  Printer,
  Edit,
  Trash2
} from 'lucide-react';

import { Surat } from '@/interface/surat';
import dummySuratData from '@/data/suratDetail';

const StatusIcon = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case 'surat diterima':
    case 'draft dibuat':
      return <Mail className="w-5 h-5 text-blue-500" />;
    case 'dibaca':
    case 'direview':
      return <FileText className="w-5 h-5 text-yellow-500" />;
    case 'disposisi':
      return <ArrowRight className="w-5 h-5 text-purple-500" />;
    case 'disetujui & ditandatangani':
    case 'terkirim':
    case 'selesai':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    default:
      return <Clock className="w-5 h-5 text-neutral-500" />;
  }
};

export default function SuratDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [surat, setSurat] = useState<Surat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && dummySuratData[id]) {
      setSurat(dummySuratData[id]);
    } else {
      // Handle not found case, maybe redirect or show an error
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return <DashboardLayout><div>Loading...</div></DashboardLayout>;
  }

  if (!surat) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Surat tidak ditemukan</h2>
          <button onClick={() => router.back()} className="mt-4 btn-primary">
            Kembali
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-neutral-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>
          <div className="flex items-center space-x-3">
            <button className="btn-secondary flex items-center space-x-2"><Edit className="w-4 h-4" /><span>Edit</span></button>
            <button className="btn-secondary flex items-center space-x-2"><Printer className="w-4 h-4" /><span>Cetak</span></button>
            <button className="btn-destructive flex items-center space-x-2"><Trash2 className="w-4 h-4" /><span>Hapus</span></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Surat Info */}
            <div className="card p-6">
              <h1 className="text-xl font-bold text-neutral-800 mb-2">{surat.perihal}</h1>
              <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-4">
                <span>#{surat.nomor}</span>
                <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
                <span>Prioritas: <span className="font-medium text-red-600">{surat.prioritas}</span></span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 mt-0.5 text-neutral-400" />
                  <div>
                    <p className="text-neutral-500">Tanggal Surat</p>
                    <p className="font-medium text-neutral-700">{surat.tanggalSurat}</p>
                  </div>
                </div>
                {surat.tanggalDiterima && (
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 mt-0.5 text-neutral-400" />
                    <div>
                      <p className="text-neutral-500">Tanggal Diterima</p>
                      <p className="font-medium text-neutral-700">{surat.tanggalDiterima}</p>
                    </div>
                  </div>
                )}
                {surat.pengirim && (
                  <div className="flex items-start space-x-3">
                    <User className="w-4 h-4 mt-0.5 text-neutral-400" />
                    <div>
                      <p className="text-neutral-500">Pengirim</p>
                      <p className="font-medium text-neutral-700">{surat.pengirim}</p>
                    </div>
                  </div>
                )}
                {surat.penerima && (
                  <div className="flex items-start space-x-3">
                    <User className="w-4 h-4 mt-0.5 text-neutral-400" />
                    <div>
                      <p className="text-neutral-500">Penerima</p>
                      <p className="font-medium text-neutral-700">{surat.penerima}</p>
                    </div>
                  </div>
                )}
              </div>

              {surat.lampiranUrl && (
                <div className="mt-6">
                  <a href={surat.lampiranUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center space-x-2 w-full sm:w-auto">
                    <Download className="w-4 h-4" />
                    <span>Lihat & Unduh Lampiran</span>
                  </a>
                </div>
              )}
            </div>

            {/* Surat Content Preview */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold text-neutral-800 mb-4">Isi Surat (Preview)</h2>
                <div className="prose prose-sm max-w-none text-neutral-700">
                    <p>Dengan hormat,</p>
                    <p>Sehubungan dengan adanya kebutuhan akan maintenance perangkat teknologi informasi di perusahaan kami, bersama surat ini kami mengajukan penawaran kerjasama untuk layanan maintenance rutin...</p>
                    <p>Besar harapan kami untuk dapat menjalin kerjasama yang baik dengan perusahaan Bapak/Ibu.</p>
                    <p>Hormat kami,</p>
                    <br/>
                    <p><strong>PT. Sejahtera Abadi</strong></p>
                </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-800 mb-4">Riwayat Status</h2>
              <div className="space-y-6">
                {surat.history.map((item, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                        <StatusIcon status={item.status} />
                      </div>
                      {index < surat.history.length - 1 && (
                        <div className="w-px h-full bg-neutral-300 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="font-medium text-neutral-800">{item.status}</p>
                      <p className="text-xs text-neutral-500">{item.tanggal}</p>
                      {item.user && <p className="text-sm text-neutral-600 mt-1">oleh: {item.user}</p>}
                      {item.catatan && <p className="text-sm text-neutral-600 mt-1 italic">"{item.catatan}"</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
