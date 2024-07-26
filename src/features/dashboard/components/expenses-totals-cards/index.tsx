import { useEffect } from 'react';
import ExpensesTotalCard from './expenses-total-card';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchExpensesSum, getDashboardFilters, getExpensesSum } from '../../slice/dashboard-slice';
import SecondaryExpensesTotalCards from './secondary.expenses-totals-cards';
import { NewPaymentMethodDialog } from '../new-payment-method-dialog';

export default function ExpensesTotalCards() {
  const dispatch = useAppDispatch();

  const { expensesSum } = useAppSelector(getExpensesSum);
  const dashboardFiltes = useAppSelector(getDashboardFilters);

  useEffect(() => {
    dispatch(fetchExpensesSum(dashboardFiltes.date));
  }, [dashboardFiltes, dispatch]);

  const mainExpensesSum = expensesSum.length > 3 ? expensesSum.slice(0, 4) : expensesSum;
  const secondaryExpensesSum = expensesSum.length > 3 ? [...expensesSum].splice(4, 4) : [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-9 gap-3 w-full">
      {mainExpensesSum.map(({ sum, paymentMethodName, paymentMethodId }) => (
        <div className="col-span-1 sm:col-span-3 lg:col-span-2" key={paymentMethodId}>
          <ExpensesTotalCard id={paymentMethodId} total={sum} title={paymentMethodName} />
        </div>
      ))}

      {secondaryExpensesSum.length > 0 && (
        <div className="col-span-2 grid grid-cols-2 sm:col-span-4 gap-2 lg:hidden">
          <SecondaryExpensesTotalCards />
        </div>
      )}

      <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-start items-center lg:col-span-1">
        <NewPaymentMethodDialog disabled={mainExpensesSum.length === 4} />
      </div>
    </div>
  );
}
