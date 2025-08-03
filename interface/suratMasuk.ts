export interface SuratMasuk {
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
