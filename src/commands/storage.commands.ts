import { AccountingTableRow } from '../components/AccountingTable/accounting-table.interface';
import { RecordsStorage } from '../services/local-storage.service';

export function getAccountingRecordsFromStorage(): AccountingTableRow[] {
  return RecordsStorage.getRecords().map((record) => ({
    ...record,
    key: record.id,
    date: record.dateCreated,
  }));
}

export function setTableRowsToStorage(rows: AccountingTableRow[]): void {
  const parsedRows = rows.map((row) => ({ ...row, id: row.key as string, dateCreated: row.date }));

  RecordsStorage.setRecords(parsedRows);
}
