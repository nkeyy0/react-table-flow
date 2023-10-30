import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { TableCellConfig } from '../../../../interfaces/table.interface';

const getInputNodeByType = (type: 'text' | 'number' | 'date' | 'select' = 'text', props: object) => {
  switch (type) {
    case 'text':
      return <Input {...props} />;
    case 'number':
      return <InputNumber {...props} />;
    case 'date':
      return <DatePicker {...props} />;
    case 'select':
      return <Select {...props} />;
    default:
      throw new Error(`Unhandled type ${type}`);
  }
};

type TableCellProps = TableCellConfig & React.HTMLAttributes<HTMLElement>;

const TableCell = (props: TableCellProps) => {
  const { inputType, inputProps = {}, formItemProps = {}, dataIndex, ...restCellProps } = props;

  if (props.type === 'new' || props.type === 'edit') {
    const inputNode = getInputNodeByType(inputType, inputProps);

    return (
      <td {...restCellProps}>
        <Form.Item name={dataIndex} {...formItemProps} style={{ margin: 0 }}>
          {inputNode}
        </Form.Item>
      </td>
    );
  }

  return <td {...restCellProps}>{props.children}</td>;
};

export default TableCell;
