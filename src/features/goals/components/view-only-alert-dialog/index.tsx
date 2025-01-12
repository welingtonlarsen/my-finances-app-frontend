import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function ViewOnlyAlertDialog() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="animate-in slide-in-from-bottom-5 duration-1000">
        {/* Using a regular button instead of AlertDialogCancel to avoid Radix UI's automatic focus behavior
            which causes unwanted focus ring on initial render */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-3 inline-flex h-8 w-8 items-center justify-center rounded-sm opacity-70 hover:bg-accent hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <AlertDialogHeader>
          <AlertDialogTitle>We're Building Something Great!</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Hey there! We're currently building this page to make it awesome for you.</p>
            <p>While you can look around, the features aren't ready just yet.</p>
            <p>Come back soon to see the magic happen! 🚀</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
