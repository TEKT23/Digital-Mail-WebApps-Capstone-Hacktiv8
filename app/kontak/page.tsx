'use client';

import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Search, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Filter 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Kontak } from '@/interface/kontak';
import kontakData from '@/data/kontak';

export default function KontakPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartemen, setFilterDepartemen] = useState('semua');

  const departemenOptions = useMemo(() => {
    const allDepartemen = kontakData.map(k => k.departemen);
    return ['semua', ...Array.from(new Set(allDepartemen))];
  }, []);

  const filteredKontak = useMemo(() => {
    return kontakData.filter(kontak => {
      const matchSearch = kontak.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kontak.jabatan.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchFilter = filterDepartemen === 'semua' || kontak.departemen === filterDepartemen;
      
      return matchSearch && matchFilter;
    });
  }, [searchTerm, filterDepartemen]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Buku Alamat</h1>
            <p className="text-neutral-600">Cari dan kelola kontak internal.</p>
          </div>
          <button className="btn-primary flex items-center space-x-2 self-start sm:self-center">
            <Plus className="w-4 h-4" />
            <span>Tambah Kontak</span>
          </button>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau jabatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={filterDepartemen}
                onChange={(e) => setFilterDepartemen(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {departemenOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === 'semua' ? 'Semua Departemen' : opt}</option>
                ))}
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kontak Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredKontak.map((kontak) => (
            <div key={kontak.id} className="card text-center hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-grow">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={kontak.avatarUrl} alt={kontak.nama} />
                  <AvatarFallback className="text-2xl">
                    {kontak.nama.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg text-neutral-800">{kontak.nama}</h3>
                <p className="text-sm text-blue-600">{kontak.jabatan}</p>
                <p className="text-sm text-neutral-500 mb-3">{kontak.departemen}</p>
              </div>
              
              <div className="border-t border-neutral-200 pt-3 mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2 text-neutral-600">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <a href={`mailto:${kontak.email}`} className="hover:text-blue-600">{kontak.email}</a>
                </div>
                <div className="flex items-center justify-center space-x-2 text-neutral-600">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <a href={`tel:${kontak.telepon}`} className="hover:text-blue-600">{kontak.telepon}</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredKontak.length === 0 && (
          <div className="text-center py-16 col-span-full">
            <User className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-800 mb-2">Kontak tidak ditemukan</h3>
            <p className="text-neutral-600">Coba ubah filter atau kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
