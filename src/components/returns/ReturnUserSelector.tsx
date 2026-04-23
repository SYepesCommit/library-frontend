import { Card, Space, Typography, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UserSelectorProps } from '@/src/types/returns';

const { Text } = Typography;

export const UserSelector = ({ users, loading, onSelect }: UserSelectorProps) => (
  <Card className="mb-6 shadow-sm border-blue-100 bg-blue-50/30">
    <Space vertical className="w-full">
      <Text strong className="text-slate-600 text-xs uppercase">Buscar Usuario</Text>
      <Select
        placeholder="Escribe el nombre del usuario..."
        className="w-full"
        showSearch
        allowClear
        loading={loading}
        onChange={onSelect}
        options={users?.map(u => ({ label: u.name, value: u.id }))}
        suffixIcon={<SearchOutlined />}
      />
    </Space>
  </Card>
);