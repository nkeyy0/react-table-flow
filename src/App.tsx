import { Button, Form } from 'antd';
import { AccountingTable } from './components/AccountingTable';
import type { AccountingTableRow, AccountingTableState } from './components/AccountingTable/accounting-table.interface';
import { useState } from 'react';
import 'antd/dist/reset.css';

import { getAccountingRecordsFromStorage, setTableRowsToStorage } from './commands/storage.commands';
import { TableActionColumn } from './components/AccountingTable/components/TableActionsDropdown';
import dayjs from 'dayjs';
import { AccountingTableHelper } from './helpers/accounting-table.helper';
import { DEFAULT_DATE_FORMAT } from './constants/date.constants';
import { CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface FormValues {
  date: dayjs.Dayjs;
  amount: number;
  type: 'income' | 'expense';
  note: string;
}

function App() {
  const [rows, setRows] = useState<AccountingTableRow[]>(getAccountingRecordsFromStorage());
  const [form] = Form.useForm<FormValues>();

  const [tableState, setTableState] = useState<AccountingTableState>({ type: 'view' });
  const currentRowKey = tableState.type === 'view' ? null : tableState.row.key;

  function onEdit(record: AccountingTableRow): void {
    form.setFieldsValue({
      date: dayjs(record.date),
      amount: record.amount,
      type: record.type,
      note: record.note,
    });
    setTableState({ type: 'edit', row: record });
  }

  function onDelete(row: AccountingTableRow): void {
    try {
      const newRows = rows.filter(({ key }) => key !== row.key);
      setRows(newRows);
      setTableState({ type: 'view' });
      setTableRowsToStorage(newRows);
    } catch (error) {
      console.error(error);
      // TODO: abort delete
    }
  }

  function onAddButtonClick() {
    const row = AccountingTableHelper.getTableInitialRow();
    setRows([row, ...rows]);
    form.setFieldsValue({
      date: dayjs(),
      amount: row.amount,
      type: row.type,
      note: row.note,
    });
    setTableState({ type: 'new', row });
  }

  async function onSave(): Promise<void> {
    try {
      if (tableState.type === 'view') return;
      const row = await form.validateFields();
      const newRows = rows.map((tableRow) => {
        if (tableRow.key === currentRowKey) {
          return { ...row, key: tableRow.key, date: row.date.format(DEFAULT_DATE_FORMAT) };
        }

        return { ...tableRow };
      });

      setRows(newRows);
      setTableRowsToStorage(newRows);

      setTableState({ type: 'view' });
    } catch (error) {
      console.error(error);
      // TODO: abort save
    }
  }

  function onCancel(): void {
    if (tableState.type === 'new') {
      setRows(rows.filter((record) => record.key !== currentRowKey));
    }

    setTableState({ type: 'view' });
  }

  return (
    <>
      <Button type="primary" onClick={onAddButtonClick}>
        Add new
      </Button>
      <Form form={form} component={false}>
        <AccountingTable
          rows={rows}
          actionContent={(row) => {
            if ((tableState.type === 'new' || tableState.type === 'edit') && row.key === currentRowKey) {
              return (
                <div style={{ display: 'flex', gap: '4px' }}>
                  <Button shape="circle" icon={<CloseCircleOutlined />} onClick={onCancel} />
                  <Button shape="circle" icon={<CheckOutlined />} onClick={onSave} />
                </div>
              );
            }

            return <TableActionColumn onEdit={() => onEdit(row)} onDelete={() => onDelete(row)} />;
          }}
          tableState={tableState}
        />
      </Form>
    </>
  );
}

export default App;
