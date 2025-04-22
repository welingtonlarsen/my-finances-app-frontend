import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, MoreVertical } from 'lucide-react';

type TProps = {
  handleDeleteExpense: () => void;
  handleEditExpense: () => void;
  isDeleting: boolean;
};

export default function ExpenseItemDropdownMenu({ handleDeleteExpense, isDeleting, handleEditExpense }: TProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          {!isDeleting && <MoreVertical className="h-3.5 w-3.5" />}
          {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEditExpense}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteExpense}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
