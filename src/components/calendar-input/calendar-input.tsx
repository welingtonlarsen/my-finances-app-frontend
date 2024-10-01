import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';

export default function CalendarInput() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('w-[240px] pl-3 text-left font-normal')}>
          {/*{field.value ? (*/}
          {/*  format(field.value, "PPP")*/}
          {/*) : (*/}
          {/*  <span>Pick a date</span>*/}
          {/*)}*/}
          <span>Pick a date</span>
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          // selected={field.value}
          // onSelect={field.onChange}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
