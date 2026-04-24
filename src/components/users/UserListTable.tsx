import React from 'react';
import { Table, Card, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { UserListTableProps } from '@/src/types/user';
import { userColumns } from './UsersColumns';

const { Title } = Typography;

export const UserListTable = ({ users, loading }: Readonly<UserListTableProps>) => (
  <Card className="shadow-md border-none min-h-[500px]">
    <div className="flex items-center gap-2 mb-6">
      <TeamOutlined className="text-blue-600 text-xl" />
      <Title level={4} className="!mb-0">Usuarios Registrados</Title>
    </div>
    
    <Table 
      dataSource={users} 
      columns={userColumns} 
      rowKey="id"
      loading={loading}
      scroll={{ x: 800 }}
      pagination={{ pageSize: 8 }}
      className="custom-table"
      locale={{ emptyText: 'No hay usuarios registrados aún' }}
    />
  </Card>
);