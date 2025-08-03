export interface SuratKeluar {
  id: string;
  nomor: string;
  tujuan: string;
  perihal: string;
  tanggalSurat: string;
  tanggalKirim?: string;
  status: 'draft' | 'review' | 'approved' | 'sent';
  prioritas: 'rendah' | 'normal' | 'tinggi' | 'urgent';
  lampiran: boolean;
  pembuat: string;
  reviewer?: string;
}
