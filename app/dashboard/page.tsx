'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import BagianUmumDashboard from '@/components/dashboards/BagianUmumDashboard';
import ADCDashboard from '@/components/dashboards/ADCDashboard';
import DirekturDashboard from '@/components/dashboards/DirekturDashboard';

export default function Dashboard() {
  const [userRole, setUserRole] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (!role) {
      router.push('/');
      return;
    }
    setUserRole(role);
  }, [router]);

  const renderDashboard = () => {
    switch (userRole) {
      case 'bagian-umum':
        return <BagianUmumDashboard />;
      case 'adc':
        return <ADCDashboard />;
      case 'direktur':
        return <DirekturDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

  if (!userRole) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}