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
import { PaymentMethod } from '@/types/expense-types';

type TProps = {
  paymentMethods: PaymentMethod[];
  onSelectPaymentMethods: (ids: number[]) => void;
};

export default function PaymentMethodFilter({ paymentMethods, onSelectPaymentMethods }: TProps) {
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

  const handleFilterChange = (filterId: number) => {
    const newSelectedFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((id) => id !== filterId)
      : [...selectedFilters, filterId];
    setSelectedFilters(newSelectedFilters);
    onSelectPaymentMethods(newSelectedFilters);
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
        {paymentMethods.map((option) => (
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
