export interface Surat {
  id: string;
  type: 'masuk' | 'keluar';
  nomor: string;
  perihal: string;
  tanggalSurat: string;
  tanggalDiterima?: string;
  pengirim?: string; // For surat masuk
  penerima?: string; // For surat keluar
  status: string;
  prioritas: string;
  lampiranUrl?: string;
  history: {
    status: string;
    tanggal: string;
    catatan?: string;
    user?: string;
  }[];
}
