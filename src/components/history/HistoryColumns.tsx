import { Tag, Typography, Space } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CalendarOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const historyColumns = [
  {
    title: 'Libro',
    dataIndex: ['book', 'title'],
    key: 'book',
    render: (text: string) => <Text strong className="text-slate-700">{text}</Text>,
  },
  {
    title: 'Fecha Reserva',
    dataIndex: 'dateReservation',
    key: 'dateRes',
    render: (date: string) => (
      <Space className="text-slate-500">
        <CalendarOutlined />
        {new Date(date).toLocaleDateString()}
      </Space>
    ),
  },
  {
    title: 'Fecha Límite',
    dataIndex: 'dateDevolucion',
    key: 'dateDev',
    render: (dateDevolucion: string, record: any) => {
      const isOverdue = new Date(dateDevolucion) < new Date() && !record.returnedAt;
      return (
        <Text type={isOverdue ? "danger" : "secondary"} strong={isOverdue}>
          {new Date(dateDevolucion).toLocaleDateString()}
          {isOverdue && <Tag color="error" className="ml-2">!Plazo Excedido!</Tag>}
        </Text>
      );
    }
  },
  {
    title: 'Estado / Fecha Entrega',
    dataIndex: 'returnedAt',
    key: 'status',
    render: (returnedAt: string | null) => (
      returnedAt ? (
        <Tag icon={<CheckCircleOutlined />} color="success" className="rounded-full px-3">
          Devuelto: {new Date(returnedAt).toLocaleDateString()}
        </Tag>
      ) : (
        <Tag icon={<ClockCircleOutlined />} color="warning" className="rounded-full px-3 border-none bg-orange-50 text-orange-600">
          En posesión
        </Tag>
      )
    ),
  },
];