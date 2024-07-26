import { useAppSelector } from '@/app/redux/store.ts';
import { getExpensesSum } from '@/features/dashboard/slice/dashboard-slice.ts';
import ExpensesTotalCardSecondary from './expenses-total-card-secondary';

export default function SecondaryExpensesTotalCards() {
  const { expensesSum } = useAppSelector(getExpensesSum);

  const secondaryExpensesSum = expensesSum.length > 3 ? [...expensesSum].splice(4, 4) : [];

  return (
    <>
      {secondaryExpensesSum.map(({ paymentMethodName, sum, paymentMethodId }) => {
        return (
          <div key={paymentMethodId}>
            <ExpensesTotalCardSecondary total={sum} title={paymentMethodName} />
          </div>
        );
      })}
    </>
  );
}
