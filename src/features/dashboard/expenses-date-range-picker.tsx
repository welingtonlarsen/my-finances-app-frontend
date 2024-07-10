import { useAppDispatch, useAppSelector } from '@/app/store';
import { DateRangePicker } from '@/components/raw/date-range-picker';
import { getDashboardFilters, setDateFilter } from './dashboard-slice';
import { createDateFromISOString, toISOString } from '@/lib/date-utils';

export default function ExpensesDateRangePicker() {
  const dispatch = useAppDispatch();
  const { date: dateFilters } = useAppSelector(getDashboardFilters);

  const onDateChange = (from: Date, to?: Date) => {
    dispatch(
      setDateFilter({
        from: toISOString(from),
        to: toISOString(to),
      }),
    );
  };

  return (
    <DateRangePicker
      initialFrom={createDateFromISOString(dateFilters.from)}
      initialTo={createDateFromISOString(dateFilters.to)}
      onDateChange={onDateChange}
    />
  );
}
