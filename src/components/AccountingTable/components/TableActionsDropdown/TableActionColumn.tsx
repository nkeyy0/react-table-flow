import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const menuItems: MenuProps['items'] = [
  {
    label: 'Edit',
    key: 'edit',
  },
  {
    label: 'Delete',
    key: 'delete',
  },
];

const TableActionsDropdown: React.FC<Props> = ({ onEdit, onDelete }) => {
  function onSelect({ key }: { key: string }): void {
    switch (key) {
      case 'edit':
        onEdit();
        break;
      case 'delete':
        onDelete();
        break;
      default:
        throw new Error(`Unhandled key ${key}`);
        break;
    }
  }
  return (
    <Dropdown menu={{ items: menuItems, onClick: onSelect }} trigger={['click']}>
      <MenuOutlined />
    </Dropdown>
  );
};

export default TableActionsDropdown;
