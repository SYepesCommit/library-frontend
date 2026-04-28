import { Card, Select, DatePicker, Typography } from 'antd';
import { UserOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import { HistoryFiltersProps } from '@/src/types/history';

const { RangePicker } = DatePicker;
const { Text } = Typography;

/**
 * Componente de filtrado especializado para el módulo de auditoría.
 * * Implementa el patrón de "Componente Controlado" para permitir que el padre
 * resetee los campos visuales al cambiar de contexto (Usuario -> Libro).
 * * @component
 */
export const HistoryFilters = ({ 
  mode, 
  data, 
  onEntityChange, 
  onDateChange, 
  loading,
  entityId,
  dateValues
}: Readonly<HistoryFiltersProps>) => (
  <Card className="mb-6 shadow-sm border-slate-100 bg-slate-50/50" style={{ marginBottom: 16 }}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Text strong className="block mb-2 text-slate-500 text-xs uppercase">
          {mode === 'user' ? 'Filtrar Usuario' : 'Filtrar Libro'}
        </Text>
        <Select
          showSearch
          value={entityId}
          placeholder={mode === 'user' ? "Selecciona un usuario" : "Selecciona un libro"}
          className="w-full"
          loading={loading}
          onChange={onEntityChange}
          suffixIcon={mode === 'user' ? <UserOutlined /> : <BookOutlined />}
          options={data}
          optionFilterProp="label"
          allowClear
        />
      </div>
      <div className="w-full">
        <Text strong className="block mb-2 text-slate-500 text-xs uppercase">Rango de Fechas</Text>
        <RangePicker 
          className="w-full" 
          value={dateValues}
          onChange={onDateChange}
          placeholder={['Desde', 'Hasta']}
          suffixIcon={<CalendarOutlined />}
          allowClear
        />
      </div>
    </div>
  </Card>
);