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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface FixedExpense {
  id: string;
  title: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  category: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
}

const FixedExpenses = () => {
  const [expenses, setExpenses] = useState<FixedExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<FixedExpense | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    frequency: 'monthly' as 'monthly' | 'quarterly' | 'yearly',
    category: '',
    start_date: new Date(),
    end_date: undefined as Date | undefined
  });
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    fetchFixedExpenses();
  }, []);

  const fetchFixedExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from('fixed_expenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExpenses((data || []) as FixedExpense[]);
    } catch (error) {
      console.error('Error fetching fixed expenses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch fixed expenses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const expenseData = {
        title: formData.title,
        amount: formData.amount,
        frequency: formData.frequency,
        category: formData.category,
        start_date: format(formData.start_date, 'yyyy-MM-dd'),
        end_date: formData.end_date ? format(formData.end_date, 'yyyy-MM-dd') : null
      };

      if (editingExpense) {
        const { error } = await supabase
          .from('fixed_expenses')
          .update(expenseData)
          .eq('id', editingExpense.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Fixed expense updated successfully" });
      } else {
        const { error } = await supabase
          .from('fixed_expenses')
          .insert([expenseData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Fixed expense added successfully" });
      }
      
      fetchFixedExpenses();
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
    if (!confirm('Are you sure you want to delete this fixed expense?')) return;
    
    try {
      const { error } = await supabase
        .from('fixed_expenses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Fixed expense deleted successfully" });
      fetchFixedExpenses();
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
      title: '',
      amount: 0,
      frequency: 'monthly' as 'monthly' | 'quarterly' | 'yearly',
      category: '',
      start_date: new Date(),
      end_date: undefined
    });
    setEditingExpense(null);
  };

  const openEditDialog = (expense: FixedExpense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      frequency: expense.frequency,
      category: expense.category,
      start_date: new Date(expense.start_date),
      end_date: expense.end_date ? new Date(expense.end_date) : undefined
    });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t('fixed_expenses')}</h1>
        {isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                {t('add_fixed_expense')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingExpense ? t('edit') : t('add_fixed_expense')}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">{t('title')}</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="amount">{t('amount')}</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">{t('category')}</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">{t('frequency')}</Label>
                  <Select value={formData.frequency} onValueChange={(value: any) => setFormData({...formData, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">{t('monthly')}</SelectItem>
                      <SelectItem value="quarterly">{t('quarterly')}</SelectItem>
                      <SelectItem value="yearly">{t('yearly')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('start_date')}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.start_date ? format(formData.start_date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.start_date}
                        onSelect={(date) => date && setFormData({...formData, start_date: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>{t('end_date')} (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.end_date ? format(formData.end_date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.end_date}
                        onSelect={(date) => setFormData({...formData, end_date: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
          <CardTitle>{t('fixed_expenses')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('title')}</TableHead>
                <TableHead>{t('amount')}</TableHead>
                <TableHead>{t('frequency')}</TableHead>
                <TableHead>{t('category')}</TableHead>
                <TableHead>{t('start_date')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                {isAdmin && <TableHead>{t('actions')}</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>{t(expense.frequency)}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{format(new Date(expense.start_date), "PPP")}</TableCell>
                  <TableCell>
                    <Badge variant={expense.is_active ? 'default' : 'secondary'}>
                      {expense.is_active ? t('active') : t('inactive')}
                    </Badge>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(expense)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(expense.id)}
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

export default FixedExpenses;