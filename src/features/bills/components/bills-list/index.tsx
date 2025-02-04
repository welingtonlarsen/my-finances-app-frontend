import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockBills } from '../../constants/mock-data';
import BillItem from './bill-item';
import { useState } from 'react';
import { Bill } from '../../types/bills-types';

export default function BillsList() {
  const [bills, setBills] = useState<Bill[]>(mockBills);

  const handleUpdateBill = (updatedBill: Bill) => {
    setBills((prevBills) => prevBills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill)));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Bills</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Current Month</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <BillItem key={bill.id} bill={bill} onUpdate={handleUpdateBill} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
