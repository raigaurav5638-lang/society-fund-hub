import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Donation } from '@/types';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface DonationsListProps {
  donations: Donation[];
  onAddNew: () => void;
  onEdit: (donation: Donation) => void;
  onDelete: (id: string) => void;
}

export default function DonationsList({ donations, onAddNew, onEdit, onDelete }: DonationsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonations = donations.filter(donation =>
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.flatNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'cash': return 'bg-success';
      case 'online': return 'bg-info';
      case 'cheque': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Donations</h1>
          <p className="text-muted-foreground">Manage temple donations and track contributors</p>
        </div>
        <Button onClick={onAddNew} className="bg-gradient-to-r from-temple-saffron to-temple-gold hover:from-temple-saffron/90 hover:to-temple-gold/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Donation
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center bg-temple-cream px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">Total: ₹{totalAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredDonations.map((donation) => (
          <Card key={donation.id} className="transition-all duration-300 hover:shadow-elegant">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{donation.donorName}</h3>
                      <p className="text-muted-foreground">{donation.purpose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success">
                        ₹{donation.amount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(donation.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getPaymentMethodColor(donation.paymentMethod)}>
                      {donation.paymentMethod.toUpperCase()}
                    </Badge>
                    {donation.flatNumber && (
                      <Badge variant="outline">
                        Flat: {donation.flatNumber}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    {donation.phone && <p>📞 {donation.phone}</p>}
                    {donation.email && <p>✉️ {donation.email}</p>}
                  </div>
                </div>
                
                <div className="flex gap-2 lg:flex-col">
                  <Button variant="outline" size="sm" onClick={() => onEdit(donation)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(donation.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">
              {searchTerm ? 'No donations found matching your search.' : 'No donations recorded yet.'}
            </p>
            <Button 
              onClick={onAddNew} 
              variant="outline" 
              className="mt-4"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Donation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}