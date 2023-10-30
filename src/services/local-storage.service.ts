import { LOCAL_STORAGE_KEYS } from '../constants/local-storage-keys.contants';
import { AccountingRecord } from '../interfaces/accounting-record.interface';
import { isArrayOfAccountingRecords } from '../guards/accounting-record';

export class RecordsStorage {
  static getRecords(): AccountingRecord[] {
    const accountingRecords = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCOUNTING_RECORDS);

    if (accountingRecords === null) {
      return [];
    }

    const parsedRecords = JSON.parse(accountingRecords);

    if (!isArrayOfAccountingRecords(parsedRecords)) {
      throw new Error('Invalid records');
    }

    return parsedRecords;
  }

  static setRecords(records: AccountingRecord[]): void {
    if (!isArrayOfAccountingRecords(records)) {
      throw new Error('Invalid records');
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCOUNTING_RECORDS, JSON.stringify(records));
  }
}
