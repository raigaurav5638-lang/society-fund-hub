import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';

interface DateFilterProps {
  onFilterChange: (fromDate: Date | null, toDate: Date | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilterChange }) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const { t } = useTranslation();

  const handleApplyFilter = () => {
    onFilterChange(fromDate, toDate);
  };

  const handleClearFilter = () => {
    setFromDate(null);
    setToDate(null);
    onFilterChange(null, null);
  };

  return (
    <div className="bg-card p-4 rounded-lg border space-y-4">
      <h3 className="font-semibold text-foreground">{t('filter_by_date')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('from_date')}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromDate || undefined}
                onSelect={(date) => setFromDate(date || null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>{t('to_date')}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={toDate || undefined}
                onSelect={(date) => setToDate(date || null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleApplyFilter} disabled={!fromDate && !toDate}>
          {t('apply_filter')}
        </Button>
        <Button variant="outline" onClick={handleClearFilter}>
          <X className="h-4 w-4 mr-2" />
          {t('clear_filter')}
        </Button>
      </div>
    </div>
  );
};

export default DateFilter;