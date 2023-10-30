export interface AccountingRecord {
  id: string;
  dateCreated: string;
  amount: number;
  type: 'income' | 'expense';
  note: string;
}
