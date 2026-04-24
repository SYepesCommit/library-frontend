import { Card, Space, Select, DatePicker, Typography } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { User } from '@/src/types/user';

const { RangePicker } = DatePicker;
const { Text } = Typography;

export const HistoryFilters = ({ 
  users, 
  onUserChange, 
  onDateChange, 
  loadingUsers 
}: { 
  users: User[]; 
  onUserChange: (value: number) => void; 
  onDateChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => void; 
  loadingUsers: boolean 
}) => (
  <Card className="mb-6 shadow-sm border-slate-100 bg-slate-50/50" style={{ marginBottom:16}}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Text strong className="block mb-2 text-slate-500 text-xs uppercase text-nowrap">Filtrar Usuario</Text>
        <Select
          showSearch
          placeholder="Selecciona un usuario"
          className="w-full"
          loading={loadingUsers}
          onChange={onUserChange}
          suffixIcon={<UserOutlined />}
          options={users?.map((u: User) => ({ label: u.name, value: u.id }))}
        />
      </div>
      <div className="w-full">
        <Text strong className="block mb-2 text-slate-500 text-xs uppercase text-nowrap">Rango de Fechas</Text>
        <RangePicker 
          className="w-full" 
          onChange={onDateChange}
          placeholder={['Desde', 'Hasta']}
          suffixIcon={<CalendarOutlined />}
        />
      </div>
    </div>
  </Card>
);