import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/money-utils';
import { useAppDispatch, useAppSelector } from '@/app/redux/store.ts';
import { deletePaymentMethod } from '../../slice/dashboard-thunks';
import { getPaymentMethods } from '../../slice/dashboard-selectors';
import ExpensesTotalCardDropdownMenu from './expense-total-card-dropdown-menu';

interface TProps {
  id: number;
  total: number;
  title: string;
}

export default function ExpensesTotalCard({ id, total, title }: TProps) {
  const dispatch = useAppDispatch();

  const { isDeleting } = useAppSelector(getPaymentMethods);

  const handleDeletePaymentType = () => {
    dispatch(deletePaymentMethod(id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <ExpensesTotalCardDropdownMenu isDeleting={isDeleting} onDelete={handleDeletePaymentType} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatMoney(total)}</div>
      </CardContent>
    </Card>
  );
}
