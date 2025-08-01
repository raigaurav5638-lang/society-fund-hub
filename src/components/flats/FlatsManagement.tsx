import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Flat {
  id: string;
  number: string;
  owner_name: string;
  phone?: string;
  email?: string;
  membership_fee: number;
  last_payment_date?: string;
  status: 'active' | 'inactive' | 'pending';
}

const FlatsManagement = () => {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFlat, setEditingFlat] = useState<Flat | null>(null);
  const [formData, setFormData] = useState({
    number: '',
    owner_name: '',
    phone: '',
    email: '',
    membership_fee: 0,
    status: 'active' as 'active' | 'inactive' | 'pending'
  });
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = async () => {
    try {
      const { data, error } = await supabase
        .from('flats')
        .select('*')
        .order('number');

      if (error) throw error;
      setFlats((data || []) as Flat[]);
    } catch (error) {
      console.error('Error fetching flats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch flats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingFlat) {
        const { error } = await supabase
          .from('flats')
          .update(formData)
          .eq('id', editingFlat.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Flat updated successfully" });
      } else {
        const { error } = await supabase
          .from('flats')
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Flat added successfully" });
      }
      
      fetchFlats();
      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this flat?')) return;
    
    try {
      const { error } = await supabase
        .from('flats')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Flat deleted successfully" });
      fetchFlats();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      number: '',
      owner_name: '',
      phone: '',
      email: '',
      membership_fee: 0,
      status: 'active' as 'active' | 'inactive' | 'pending'
    });
    setEditingFlat(null);
  };

  const openEditDialog = (flat: Flat) => {
    setEditingFlat(flat);
    setFormData({
      number: flat.number,
      owner_name: flat.owner_name,
      phone: flat.phone || '',
      email: flat.email || '',
      membership_fee: flat.membership_fee,
      status: flat.status
    });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t('flats')}</h1>
        {isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                {t('add_flat')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingFlat ? t('edit') : t('add_flat')}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="number">{t('flat_number_label')}</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="owner_name">{t('owner_name')}</Label>
                  <Input
                    id="owner_name"
                    value={formData.owner_name}
                    onChange={(e) => setFormData({...formData, owner_name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="membership_fee">{t('membership_fee')}</Label>
                  <Input
                    id="membership_fee"
                    type="number"
                    value={formData.membership_fee}
                    onChange={(e) => setFormData({...formData, membership_fee: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="status">{t('status')}</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t('active')}</SelectItem>
                      <SelectItem value="inactive">{t('inactive')}</SelectItem>
                      <SelectItem value="pending">{t('pending')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {t('save')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    {t('cancel')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('flats')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('flat_number_label')}</TableHead>
                <TableHead>{t('owner_name')}</TableHead>
                <TableHead>{t('phone')}</TableHead>
                <TableHead>{t('membership_fee')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                {isAdmin && <TableHead>{t('actions')}</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {flats.map((flat) => (
                <TableRow key={flat.id}>
                  <TableCell className="font-medium">{flat.number}</TableCell>
                  <TableCell>{flat.owner_name}</TableCell>
                  <TableCell>{flat.phone}</TableCell>
                  <TableCell>₹{flat.membership_fee}</TableCell>
                  <TableCell>
                    <Badge variant={flat.status === 'active' ? 'default' : 'secondary'}>
                      {t(flat.status)}
                    </Badge>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(flat)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(flat.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlatsManagement;