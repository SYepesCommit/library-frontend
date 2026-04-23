import React from 'react';
import { Table, Card, Typography } from 'antd';
import { getBookColumns } from './BookColumns';
import { BookListTableProps } from '@/src/types/book';

const { Title } = Typography;



export const BookListTable = ({ books, loading, onEdit, onDelete }: BookListTableProps) => (
  <Card className="shadow-sm border-none min-h-[500px]">
    <Title level={4} className="mb-6 text-slate-700">Inventario de Libros</Title>
    <Table 
      dataSource={books} 
      columns={getBookColumns(onEdit, onDelete)} 
      rowKey="id" 
      loading={loading}
      pagination={{ pageSize: 8, hideOnSinglePage: true }}
      className="custom-table"
    />
  </Card>
);