import ExpensesTotalCardSecondary from '@/features/dashboard/expenses-total-card-secondary.tsx';
import { useAppSelector } from '@/app/store.ts';
import { getExpensesSum } from '@/features/dashboard/dashboard-slice.ts';

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
