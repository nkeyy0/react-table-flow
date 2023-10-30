import React from 'react';
import { Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { AccountingTableRow, AccountingTableState } from './accounting-table.interface';
import TableCell from './components/TableCell/TableCell';
import { AccountingTableHelper } from '../../helpers/accounting-table.helper';
import { TableCellConfig } from '../../interfaces/table.interface';
import { DEFAULT_DATE_FORMAT } from '../../constants/date.constants';

const AccountingTable = ({
  rows,
  actionContent,
  tableState,
}: {
  rows: readonly ({ key: React.Key } & AccountingTableRow)[];
  actionContent: (row: AccountingTableRow) => React.ReactNode;
  tableState: AccountingTableState;
}) => {
  const columns: ColumnType<{
    key: React.Key;
    date: string;
    amount: number;
    type: 'income' | 'expense';
    note: string;
  }>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      onCell(record): TableCellConfig {
        return {
          title: 'Date',
          dataIndex: 'date',
          inputProps: {
            format: DEFAULT_DATE_FORMAT,
          },
          formItemProps: {
            rules: [{ required: true, message: 'Please enter Date!' }],
          },
          inputType: 'date',
          record: record,
          type: AccountingTableHelper.getCellType(tableState, record),
        };
      },
      sorter: tableState.type !== 'view' ? undefined : (row1, row2) => AccountingTableHelper.dateSorter(row1, row2),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render(_, record) {
        return <span>{AccountingTableHelper.getFormattedAmountCell(record)}</span>;
      },
      onCell(record): TableCellConfig {
        return {
          title: 'Amount',
          dataIndex: 'amount',
          inputType: 'number',
          inputProps: {
            min: 0,
          },
          formItemProps: {
            rules: [{ required: true, message: 'Please enter amount!' }],
          },
          record: record,
          type: AccountingTableHelper.getCellType(tableState, record),
        };
      },
      sorter: tableState.type !== 'view' ? undefined : (row1, row2) => AccountingTableHelper.amountSorter(row1, row2),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      onCell(record): TableCellConfig {
        return {
          title: 'Type',
          dataIndex: 'type',
          inputType: 'select',
          inputProps: {
            options: [
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' },
            ],
          },
          formItemProps: {
            rules: [{ required: true, message: 'Please select type!' }],
          },
          record: record,
          type: AccountingTableHelper.getCellType(tableState, record),
        };
      },
    },
    {
      title: 'Note',
      dataIndex: 'note',
      onCell(record): TableCellConfig {
        return {
          title: 'Note',
          dataIndex: 'note',
          inputType: 'text',
          record: record,
          type: AccountingTableHelper.getCellType(tableState, record),
        };
      },
    },
    {
      title: 'Action',
      render(_, record) {
        return actionContent(record);
      },
    },
  ];

  return (
    <Table
      columns={columns}
      components={{ body: { cell: TableCell } }}
      dataSource={rows}
      summary={(rows) => {
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{AccountingTableHelper.calculateTotalAmount(rows)}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    ></Table>
  );
};

export default AccountingTable;
