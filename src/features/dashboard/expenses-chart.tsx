import { PieChart } from 'react-minimal-pie-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';

function CategoryExpense() {
  return (
    <div className="flex items-center mb-1.5">
      <div className="h-3 w-3 bg-blue-500 rounded-full mr-2" />
      <p className="text-sm text-muted-foreground">Educação</p>
      <div className="ml-auto text-sm text-muted-foreground">+$1,999.00</div>
    </div>
  );
}

export default function ExpensesChart() {
  return;

  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Categories</CardTitle>
        <Button className="ml-auto gap-1" size="sm" variant="secondary">
          New category
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-5">
        <div className="col-span-2 max-w-44">
          <PieChart
            data={[
              { title: 'One', value: 10, color: '#E38627' },
              { title: 'Two', value: 15, color: '#C13C37' },
              { title: 'Three', value: 20, color: '#6A2135' },
            ]}
            lineWidth={30}
            rounded
          />
        </div>
        <div className="flex flex-col col-span-3 justify-around">
          <div className="flex flex-col justify-center col-span-3 ml-4 sm:ml-0 xl:ml-4 2xl:ml-0">
            <CategoryExpense />
            <CategoryExpense />
            <CategoryExpense />
            <CategoryExpense />
            <CategoryExpense />
          </div>
          <div className="flex items-center justify-center">
            <Button variant="link" className="w-16 h-3">
              See more
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
