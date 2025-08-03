import { Surat } from '@/interface/surat';

const dummySuratData: { [id: string]: Surat } = {
  '1': {
    id: '1',
    type: 'masuk',
    nomor: '001/UM/VII/2024',
    perihal: 'Penawaran Kerjasama Maintenance',
    tanggalSurat: '2024-07-27',
    tanggalDiterima: '2024-07-28',
    pengirim: 'PT. Sejahtera Abadi',
    status: 'Disposisi',
    prioritas: 'Normal',
    lampiranUrl: '/dummy-lampiran.pdf',
    history: [
      { status: 'Surat Diterima', tanggal: '2024-07-28 10:00', user: 'Bagian Umum' },
      { status: 'Dibaca', tanggal: '2024-07-28 11:30', user: 'Kepala Bagian Umum' },
      { status: 'Disposisi', tanggal: '2024-07-29 09:00', user: 'Direktur', catatan: 'Tolong ADC proses lebih lanjut.' },
    ],
  },
  'sk-01': {
    id: 'sk-01',
    type: 'keluar',
    nomor: '001/SK/DIR/VII/2024',
    perihal: 'Pengangkatan Manajer Baru',
    tanggalSurat: '2024-07-25',
    penerima: 'Internal',
    status: 'Terkirim',
    prioritas: 'Tinggi',
    history: [
      { status: 'Draft Dibuat', tanggal: '2024-07-24 14:00', user: 'Sekretaris' },
      { status: 'Direview', tanggal: '2024-07-24 16:00', user: 'Direktur' },
      { status: 'Disetujui & Ditandatangani', tanggal: '2024-07-25 10:00', user: 'Direktur Utama' },
      { status: 'Terkirim', tanggal: '2024-07-25 11:00', user: 'Bagian Umum' },
    ],
  },
};

export default dummySuratData;
