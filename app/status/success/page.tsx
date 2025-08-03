'use client';

import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full -mt-16">
        <div className="card text-center p-8 max-w-md">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Aksi Berhasil</h1>
          <p className="text-neutral-600 mb-6">Status surat telah berhasil diperbarui.</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <span>Kembali ke Dashboard</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
