'use client';

import { Input, Select, Card } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { statusOptions } from '@/src/config/book-config';
import { BookFiltersProps, BookStatusFilter } from '@/src/types/book';

const { Search } = Input;

export const BookFilters = ({ onSearchChange, onStatusChange }: Readonly<BookFiltersProps>) => {
  return (
    <Card className="shadow-sm border-slate-100 bg-slate-50/50" style={{
      marginBottom: 24
    }}>
      <div className="flex flex-col md:flex-row gap-4">
        <Search
          placeholder="Buscar por título o autor..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="flex-1"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Select<BookStatusFilter>
          defaultValue="all"
          size="large"
          className="w-full md:w-64"
          suffixIcon={<FilterOutlined />}
          onChange={onStatusChange}
          options={statusOptions}
        />
      </div>
    </Card>
  );
};