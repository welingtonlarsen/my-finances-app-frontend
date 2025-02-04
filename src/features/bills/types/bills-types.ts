export interface Bill {
  id: number;
  description: string;
  day: number;
  value: number;
  isPaidCurrentMonth: boolean;
}

export interface BillsState {
  bills: Bill[];
  isLoading: boolean;
  error: string | null;
}
