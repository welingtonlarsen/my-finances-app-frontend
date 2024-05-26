import { useEffect } from 'react';
import ExpensesTotalCard from './expenses-total-card';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchExpensesSum, getExpensesSum } from './dashboard-slice';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NewPaymentMethodDialog } from './new-payment-method';
import SecondaryExpensesTotalCards from '@/features/dashboard/SecondaryExpensesTotalCards.tsx';

export default function ExpensesTotalCards() {
  const dispatch = useAppDispatch();

  const { expensesSum } = useAppSelector(getExpensesSum);

  useEffect(() => {
    dispatch(fetchExpensesSum());
  }, []);

  const mainExpensesSum = expensesSum.length > 3 ? expensesSum.slice(0, 4) : expensesSum;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-9 gap-3 w-full">
      {mainExpensesSum.map(({ sum, paymentMethodName }) => (
        <div className="col-span-1 sm:col-span-3 lg:col-span-2">
          <ExpensesTotalCard total={sum} title={paymentMethodName} />
        </div>
      ))}
      <div className="col-span-2 grid grid-cols-2 sm:col-span-4 gap-2 lg:hidden">
        <SecondaryExpensesTotalCards />
      </div>
      <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-start items-center lg:col-span-1">
        <NewPaymentMethodDialog disabled={mainExpensesSum.length === 4} />
      </div>
    </div>
  );
}
