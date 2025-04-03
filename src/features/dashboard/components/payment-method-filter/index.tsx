import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { getPaymentMethods, getDashboardFilters } from '@/features/dashboard/slice/dashboard-selectors';
import { fetchExpenses } from '@/features/dashboard/slice/dashboard-thunks';
import { initialPagination } from '@/features/dashboard/constants/constants';

export default function PaymentMethodFilter() {
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const { paymentMethods } = useAppSelector(getPaymentMethods);
  const dashboardFilters = useAppSelector(getDashboardFilters);
  const dispatch = useAppDispatch();

  const handleFilterChange = (filterId: number) => {
    const newSelectedFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((id) => id !== filterId)
      : [...selectedFilters, filterId];
    setSelectedFilters(newSelectedFilters);

    dispatch(
      fetchExpenses({
        ...initialPagination,
        from: dashboardFilters.date.from,
        to: dashboardFilters.date.to,
        paymentMethodIds: newSelectedFilters.length ? newSelectedFilters : undefined,
      }),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[90px] h-[30px]">
          <Filter className="mr-2 h-4 w-4" />
          {selectedFilters.length > 0 ? <>Filter ({selectedFilters.length})</> : 'Filter'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Payment method</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(paymentMethods || []).map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={selectedFilters.includes(option.id)}
            onCheckedChange={() => handleFilterChange(option.id)}
          >
            {option.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
