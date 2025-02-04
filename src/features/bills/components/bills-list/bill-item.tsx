import { Bill } from '../../types/bills-types';
import { formatMoney } from '@/lib/money-utils';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface BillItemProps {
  bill: Bill;
  onUpdate: (updatedBill: Bill) => void;
}

export default function BillItem({ bill, onUpdate }: BillItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBill, setEditedBill] = useState(bill);

  const handleUpdate = () => {
    onUpdate(editedBill);
    setIsEditing(false);
  };

  const handleChange = (field: keyof Bill, value: string | number | boolean) => {
    setEditedBill((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell>
          <Input
            value={editedBill.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="max-w-[200px]"
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            min={1}
            max={31}
            value={editedBill.day}
            onChange={(e) => handleChange('day', parseInt(e.target.value))}
            className="max-w-[80px]"
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            step="0.01"
            value={editedBill.value}
            onChange={(e) => handleChange('value', parseFloat(e.target.value))}
            className="max-w-[120px]"
          />
        </TableCell>
        <TableCell>
          <div className="flex items-center justify-center gap-4">
            <Checkbox
              checked={editedBill.isPaidCurrentMonth}
              onCheckedChange={(checked) => handleChange('isPaidCurrentMonth', checked === true)}
            />
            <button
              onClick={handleUpdate}
              className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => setIsEditing(true)}>
      <TableCell>{editedBill.description}</TableCell>
      <TableCell>{String(editedBill.day).padStart(2, '0')}</TableCell>
      <TableCell>{formatMoney(editedBill.value)}</TableCell>
      <TableCell>
        <div className="flex justify-center">
          <Checkbox
            checked={editedBill.isPaidCurrentMonth}
            onCheckedChange={(checked) => {
              handleChange('isPaidCurrentMonth', checked === true);
              onUpdate({ ...editedBill, isPaidCurrentMonth: checked === true });
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
