export interface AccountingTableRow {
  key: React.Key;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  note: string;
}

export type AccountingTableState =
  | {
      type: 'view';
    }
  | {
      type: 'edit';
      row: AccountingTableRow;
    }
  | {
      type: 'new';
      row: AccountingTableRow;
    };
