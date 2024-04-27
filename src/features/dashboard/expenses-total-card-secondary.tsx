import { DollarSign } from "lucide-react"

import {
  Card,
  CardContent, CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ExpensesTotalCardSecondary() {
  return (
    <Card className='h-14 w-32 pt-2.5 px-2'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 m-0">
        <CardTitle className="text-xs">Total Revenue</CardTitle>
        <DollarSign className="h-3 w-3 text-muted-foreground" />
      </CardHeader>
      <CardContent className='p-0 m-0'>
        <div className="text-xs font-light text-muted-foreground">$45,231.89</div>
      </CardContent>
      <CardFooter className='m-0 p-0 h-0'/>
    </Card>
  )
}
