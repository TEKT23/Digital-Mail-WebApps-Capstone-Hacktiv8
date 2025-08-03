import { SuratKeluar } from '@/interface/suratKeluar';

const suratKeluarData: SuratKeluar[] = [
  {
    id: '1',
    nomor: 'SK/001/2025',
    tujuan: 'PT. Teknologi Maju',
    perihal: 'Balasan Permohonan Kerjasama',
    tanggalSurat: '2025-01-23',
    tanggalKirim: '2025-01-23',
    status: 'sent',
    prioritas: 'tinggi',
    lampiran: true,
    pembuat: 'Bagian Umum',
    reviewer: 'Direktur'
  },
  {
    id: '2',
    nomor: 'SK/002/2025',
    tujuan: 'Seluruh Karyawan',
    perihal: 'Pemberitahuan Kebijakan Kerja Remote',
    tanggalSurat: '2025-01-23',
    status: 'review',
    prioritas: 'normal',
    lampiran: false,
    pembuat: 'ADC'
  },
  {
    id: '3',
    nomor: 'SK/003/2025',
    tujuan: 'Dinas Pendidikan Kota',
    perihal: 'Konfirmasi Kehadiran Rapat',
    tanggalSurat: '2025-01-22',
    status: 'draft',
    prioritas: 'normal',
    lampiran: false,
    pembuat: 'Bagian Umum'
  }
];

export default suratKeluarData;
