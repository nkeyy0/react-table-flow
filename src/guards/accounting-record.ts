import { AccountingRecord } from '../interfaces/accounting-record.interface';

export function isAccountingRecord(record: unknown): record is AccountingRecord {
  return (
    typeof record === 'object' &&
    record !== null &&
    typeof (record as { dateCreated: unknown }).dateCreated === 'string' &&
    typeof (record as { amount: unknown }).amount === 'number' &&
    ((record as { type: unknown }).type === 'income' || (record as { type: unknown }).type === 'expense') &&
    typeof (record as { note: unknown }).note === 'string'
  );
}

export function isArrayOfAccountingRecords(records: unknown): records is AccountingRecord[] {
  return Array.isArray(records) && records.every((record) => isAccountingRecord(record));
}
