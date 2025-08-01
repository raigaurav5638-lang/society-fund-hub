import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Home, 
  Heart, 
  PiggyBank, 
  Receipt, 
  Building, 
  Menu,
  Globe,
  LogOut,
  Calculator
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, profile } = useAuth();
  const { t, i18n } = useTranslation();

  const navigationItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'donations', label: t('donations'), icon: Heart },
    { id: 'collections', label: t('collections'), icon: PiggyBank },
    { id: 'expenses', label: t('expenses'), icon: Receipt },
    { id: 'fixed_expenses', label: t('fixed_expenses'), icon: Calculator },
    { id: 'flats', label: t('flats'), icon: Building },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const NavigationContent = () => (
    <nav className="flex flex-col space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={currentPage === item.id ? 'default' : 'ghost'}
            className={cn(
              'justify-start w-full',
              currentPage === item.id && 'bg-gradient-to-r from-temple-saffron to-temple-gold text-white shadow-soft'
            )}
            onClick={() => {
              onPageChange(item.id);
              setIsOpen(false);
            }}
          >
            <Icon className="mr-3 h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-border shadow-soft">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-temple-saffron to-temple-gold">
            <h1 className="text-xl font-bold text-white">Temple Society</h1>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto p-4">
            <NavigationContent />
          </div>
          
          {/* Footer with language and logout */}
          <div className="p-4 border-t border-border space-y-3">
            <div className="text-xs text-muted-foreground">
              {profile?.role === 'admin' ? 'Admin' : 'User'}: {profile?.username}
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Select value={i18n.language} onValueChange={changeLanguage}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="w-full text-xs"
            >
              <LogOut className="h-3 w-3 mr-2" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-border shadow-soft">
          <h1 className="text-lg font-bold bg-gradient-to-r from-temple-saffron to-temple-gold bg-clip-text text-transparent">
            Temple Society
          </h1>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-temple-saffron to-temple-gold">
                <h1 className="text-xl font-bold text-white">Temple Society</h1>
              </div>
              <div className="p-4">
                <NavigationContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}