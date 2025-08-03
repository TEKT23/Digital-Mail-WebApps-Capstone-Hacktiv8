import { SuratProvider } from '@/context/SuratContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistem Penyuratan Digital',
  description: 'Sistem Manajemen Surat Digital dengan AI Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <html lang="en">
      <body>
        <SuratProvider>
          {children}
        </SuratProvider>
      </body>
    </html>
  );
}