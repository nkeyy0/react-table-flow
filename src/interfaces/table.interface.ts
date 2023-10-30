import { FormItemProps } from 'antd';
import { AccountingTableRow } from '../components/AccountingTable/accounting-table.interface';

export type TableInputType = 'text' | 'number' | 'date' | 'select';
export type TableCellType = 'view' | 'edit' | 'new';

export type TableCellConfig = {
  type: TableCellType;
  inputType?: TableInputType;
  inputProps?: object;
  formItemProps?: FormItemProps;
  record: AccountingTableRow;
  title: string;
  children?: React.ReactNode;
  dataIndex: string;
};
