import { useEffect } from 'react';
import ExpensesTotalCard from './expenses-total-card';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { NewPaymentMethodDialog } from '../new-payment-method-dialog';
import { fetchExpensesSum } from '../../slice/dashboard-thunks';
import { getExpensesSum, getDashboardFilters } from '../../slice/dashboard-selectors';
import ExpensesTotalCardSecondary from './expenses-total-card-secondary';

export default function ExpensesTotalCards() {
  const dispatch = useAppDispatch();

  const { expensesSum } = useAppSelector(getExpensesSum);
  const dashboardFilters = useAppSelector(getDashboardFilters);

  useEffect(() => {
    dispatch(fetchExpensesSum(dashboardFilters.date));
  }, [dashboardFilters, dispatch]);

  const mainExpensesSum = expensesSum.length > 3 ? expensesSum.slice(0, 4) : expensesSum;
  const secondaryExpensesSum = expensesSum.length > 3 ? [...expensesSum].splice(4, 4) : [];

  const isEnabledAddMorePaymentMethod = mainExpensesSum.length === 4;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-9 gap-3 w-full">
      {mainExpensesSum.map(({ sum, paymentMethodName, paymentMethodId }) => (
        <div className="col-span-1 sm:col-span-3 lg:col-span-2" key={paymentMethodId}>
          <ExpensesTotalCard id={paymentMethodId} total={sum} title={paymentMethodName} />
        </div>
      ))}

      {secondaryExpensesSum.map(({ paymentMethodName, sum, paymentMethodId }) => {
        return (
          <div key={paymentMethodId}>
            <ExpensesTotalCardSecondary total={sum} title={paymentMethodName} />
          </div>
        );
      })}

      <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-start items-center lg:col-span-1">
        <NewPaymentMethodDialog disabled={isEnabledAddMorePaymentMethod} />
      </div>
    </div>
  );
}
