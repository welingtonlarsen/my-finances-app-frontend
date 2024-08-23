import { DollarSign, Loader2, MoreVertical } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/money-utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useAppDispatch, useAppSelector } from '@/app/redux/store.ts';
import { AlertDialog } from '@/components/alert-dialog/alert-dialog.tsx';
import { deletePaymentMethod } from '../../slice/dashboard-thunks';
import { getPaymentMethods } from '../../slice/dashboard-selectors';

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="h-6 w-6">
              {!isDeleting && <MoreVertical className="h-3.5 w-3.5" />}
              {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialog
              title="Delete payment method"
              description="All expenses associated with this payment method will be deleted and this action cannot be undone."
              onConfirm={handleDeletePaymentType}
              ctaComponent={
                <Button variant="ghost" size="sm" className="font-normal w-full flex justify-start">
                  Delete
                </Button>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatMoney(total)}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
}
