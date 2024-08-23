import { useAppSelector } from '@/app/redux/store.ts';
import ExpensesTotalCardSecondary from './expenses-total-card-secondary';
import { getExpensesSum } from '../../slice/dashboard-selectors';

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
