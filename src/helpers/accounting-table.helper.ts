import dayjs from 'dayjs';
import { AccountingTableRow, AccountingTableState } from '../components/AccountingTable/accounting-table.interface';
import { TableCellType } from '../interfaces/table.interface';
import { DEFAULT_DATE_FORMAT } from '../constants/date.constants';
import { v4 } from 'uuid';

export class AccountingTableHelper {
  static getCellType(tableState: AccountingTableState, record: AccountingTableRow): TableCellType {
    switch (tableState.type) {
      case 'view':
        return 'view';
      case 'edit':
        return tableState.row.key === record.key ? 'edit' : 'view';
      case 'new':
        return tableState.row.key === record.key ? 'new' : 'view';
      default: {
        const never: never = tableState;
        throw new Error(`Unhandled table state: ${never}`);
      }
    }
  }

  static getFormattedAmountCell(record: AccountingTableRow): string {
    if (record.type === 'income') {
      return `${record.amount}$`;
    }

    return `-${record.amount}$`;
  }

  static amountSorter(row1: AccountingTableRow, row2: AccountingTableRow): number {
    const row1Copy = { ...row1 };
    const row2Copy = { ...row2 };
    if (row1.type === 'expense') {
      row1Copy.amount = -row1Copy.amount;
    }

    if (row2.type === 'expense') {
      row2Copy.amount = -row2Copy.amount;
    }

    return row1Copy.amount - row2Copy.amount;
  }

  static dateSorter(row1: AccountingTableRow, row2: AccountingTableRow): number {
    return dayjs(row1.date, DEFAULT_DATE_FORMAT).isBefore(dayjs(row2.date, DEFAULT_DATE_FORMAT)) ? -1 : 1;
  }

  static calculateTotalAmount(rows: readonly AccountingTableRow[]): number {
    return rows.reduce((sum, row) => {
      if (row.type === 'income') {
        return sum + row.amount;
      } else {
        return sum - row.amount;
      }
    }, 0);
  }

  static getTableInitialRow(): AccountingTableRow {
    return {
      key: v4(),
      date: '',
      amount: 0,
      type: 'expense',
      note: '',
    };
  }
}
