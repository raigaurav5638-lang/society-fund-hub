import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Home, 
  Heart, 
  PiggyBank, 
  Receipt, 
  Building, 
  Menu,
  Settings
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'donations', label: 'Donations', icon: Heart },
  { id: 'collections', label: 'Collections', icon: PiggyBank },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'flats', label: 'Flats', icon: Building },
];

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

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