import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { DateRangePicker } from '@/components/raw/date-range-picker';
import { getDashboardFilters, setDateFilter } from '../../slice/dashboard-slice';
import { createDateFromISOString, toISOString, toISOStringEndOfDay } from '@/lib/date-utils';

export default function ExpensesDateRangePicker() {
  const dispatch = useAppDispatch();
  const { date: dateFilters } = useAppSelector(getDashboardFilters);

  const onDateChange = (from: Date, to?: Date) => {
    dispatch(
      setDateFilter({
        from: toISOString(from),
        to: toISOStringEndOfDay(to),
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
