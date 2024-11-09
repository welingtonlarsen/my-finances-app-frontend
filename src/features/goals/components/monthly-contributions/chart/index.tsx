import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [
  { month: 'January', objetivo: 186, aporte: 80 },
  { month: 'February', objetivo: 305, aporte: 200 },
  { month: 'March', objetivo: 237, aporte: 120 },
  { month: 'April', objetivo: 73, aporte: 190 },
  { month: 'May', objetivo: 209, aporte: 130 },
  { month: 'June', objetivo: 214, aporte: 140 },
  { month: 'Julio', objetivo: 214, aporte: 140 },
  { month: 'Agosto', objetivo: 214, aporte: 140 },
  { month: 'Setembro', objetivo: 214, aporte: 140 },
  { month: 'Outubro', objetivo: 214, aporte: 140 },
  { month: 'Novembro', objetivo: 214, aporte: 140 },
  { month: 'Dezembro', objetivo: 214, aporte: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function MonthlyContributionChart() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData} barCategoryGap="20%">
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
        <Bar dataKey="objetivo" fill="#27B357" radius={4} />
        <Bar dataKey="aporte" fill="#D93829" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
