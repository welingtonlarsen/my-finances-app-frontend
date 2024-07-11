'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { isMobile } from 'react-device-detect';

type TProps = React.HTMLAttributes<HTMLDivElement> & {
  onDateChange?: (from: Date, to?: Date) => void;
  initialFrom: Date;
  initialTo: Date;
};

export function DateRangePicker({ className, onDateChange, initialFrom, initialTo }: TProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialFrom,
    to: initialTo,
  });

  const handleSetDate = (newDates: DateRange) => {
    setDate(newDates);
    onDateChange(newDates.from, newDates.to);
  };

  const DateDisplay = React.useMemo(() => {
    if (isMobile) {
      return (
        <>
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd')} - {format(date.to, 'LLL dd')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </>
      );
    }

    if (!isMobile) {
      return (
        <>
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </>
      );
    }
  }, [date]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground', isMobile && 'h-8')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {DateDisplay}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSetDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
