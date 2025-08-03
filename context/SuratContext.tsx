'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

// --- INTERFACES ---
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

interface SuratKeluar {
  id: string;
  nomor: string;
  tujuan: string;
  perihal: string;
  tanggalSurat: string;
  status: 'draft' | 'review' | 'approved' | 'sent';
  prioritas: 'rendah' | 'normal' | 'tinggi';
  lampiran: boolean;
  pembuat: string;
  reviewer?: string;
  tanggalKirim?: string;
}

interface ISuratContext {
  suratMasuk: SuratMasuk[];
  suratKeluar: SuratKeluar[];
  updateSuratMasukStatus: (id: string, status: SuratMasuk['status'], disposisiKe?: string) => void;
  getSuratById: (id: string) => SuratMasuk | SuratKeluar | undefined;
}

// --- INITIAL DATA ---
const initialSuratMasuk: SuratMasuk[] = [
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
];

const initialSuratKeluar: SuratKeluar[] = []; // Can be populated later

// --- CONTEXT CREATION ---
const SuratContext = createContext<ISuratContext | null>(null);

// --- PROVIDER COMPONENT ---
export const SuratProvider = ({ children }: { children: ReactNode }) => {
  const [suratMasuk, setSuratMasuk] = useState<SuratMasuk[]>(initialSuratMasuk);
  const [suratKeluar, setSuratKeluar] = useState<SuratKeluar[]>(initialSuratKeluar);

  const updateSuratMasukStatus = (id: string, status: SuratMasuk['status'], disposisiKe?: string) => {
    setSuratMasuk(prevSurat => {
      const newSurat = prevSurat.map(s => {
        if (s.id === id) {
          toast.success(`Status surat "${s.perihal}" diperbarui menjadi ${status}.`);
          return { ...s, status, disposisiKe: disposisiKe || s.disposisiKe };
        }
        return s;
      });
      return newSurat;
    });
  };

  const getSuratById = (id: string) => {
    const allSurat = [...suratMasuk, ...suratKeluar];
    return allSurat.find(s => s.id === id);
  };

  const value = {
    suratMasuk,
    suratKeluar,
    updateSuratMasukStatus,
    getSuratById
  };

  return (
    <SuratContext.Provider value={value}>
      {children}
    </SuratContext.Provider>
  );
};

// --- CUSTOM HOOK ---
export const useSurat = () => {
  const context = useContext(SuratContext);
  if (!context) {
    throw new Error('useSurat must be used within a SuratProvider');
  }
  return context;
};
