import { useEffect } from 'react';
import ExpensesTotalCard from './expenses-total-card';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchExpensesSum, getExpensesSum } from './dashboard-slice';

export default function ExpensesTotalCards() {
  const dispatch = useAppDispatch();

  const { expensesSum } = useAppSelector(getExpensesSum);

  useEffect(() => {
    dispatch(fetchExpensesSum());
  }, []);

  return (
    <>
      {expensesSum.map(({ sum, paymentMethodName }) => (
        <div className="flex-1 xl:max-w-80">
          <ExpensesTotalCard total={sum} title={paymentMethodName} />
        </div>
      ))}
    </>
  );
}
