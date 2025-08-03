import { SuratMasuk } from '@/interface/suratMasuk';

const suratMasukData: SuratMasuk[] = [
  {
    id: '1',
    nomor: '001/UM/VII/2024',
    pengirim: 'PT. Sejahtera Abadi',
    perihal: 'Penawaran Kerjasama Maintenance',
    tanggalTerima: '2024-07-28',
    tanggalSurat: '2024-07-27',
    status: 'baru',
    prioritas: 'normal',
    lampiran: true,
  },
  {
    id: '2',
    nomor: 'INV/2024/07/123',
    pengirim: 'CV. Maju Jaya',
    perihal: 'Invoice Pembayaran Langganan',
    tanggalTerima: '2024-07-27',
    tanggalSurat: '2024-07-26',
    status: 'dibaca',
    prioritas: 'tinggi',
    lampiran: false,
  },
  {
    id: '3',
    nomor: 'SK-005/HRD/VII/2024',
    pengirim: 'Internal - HRD',
    perihal: 'Surat Keputusan Pengangkatan Karyawan',
    tanggalTerima: '2024-07-26',
    tanggalSurat: '2024-07-26',
    status: 'disposisi',
    prioritas: 'urgent',
    lampiran: true,
    disposisiKe: 'Direktur',
  },
  {
    id: '4',
    nomor: 'P-012/MKT/VII/2024',
    pengirim: 'PT. Cipta Kreasi',
    perihal: 'Proposal Event Sponsorship',
    tanggalTerima: '2024-07-25',
    tanggalSurat: '2024-07-24',
    status: 'selesai',
    prioritas: 'rendah',
    lampiran: true,
  },
];

export default suratMasukData;
