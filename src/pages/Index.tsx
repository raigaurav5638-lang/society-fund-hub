import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/layout/Navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import Donations from '@/components/donations/Donations';
import FlatsManagement from '@/components/flats/FlatsManagement';
import FixedExpenses from '@/components/expenses/FixedExpenses';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

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
        return <FlatsManagement />;
      case 'fixed_expenses':
        return <FixedExpenses />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

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