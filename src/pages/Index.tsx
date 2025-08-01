import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import Donations from '@/components/donations/Donations';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'donations':
        return <Donations />;
      case 'collections':
        return <div className="p-6">Collections - Coming Soon</div>;
      case 'expenses':
        return <div className="p-6">Expenses - Coming Soon</div>;
      case 'flats':
        return <div className="p-6">Flats Management - Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Main Content */}
      <div className="md:pl-64">
        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Index;