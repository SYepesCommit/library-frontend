import { Space, Button, Typography, Tag } from 'antd';
import { BookOutlined, RollbackOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Reservation } from '@/src/types/reservation';

const { Text } = Typography;

/**
 * Genera las columnas para la tabla de procesos de devolución.
 * Incluye lógica de ordenamiento y detección visual de mora (overdue).
 * * @param onReturn - Función para procesar la devolución de un ejemplar.
 * @param processingId - ID de la reserva que se está procesando actualmente (para el estado loading).
 * @returns {Array} Configuración de columnas optimizada.
 */
export const getReturnColumns = (onReturn: (record: Reservation) => void, processingId: number | null) => [
  {
    title: 'Libro',
    dataIndex: ['book', 'title'],
    key: 'title',
    sorter: (a: Reservation, b: Reservation) => (a.book?.title ?? '').localeCompare(b.book?.title ?? ''),
    render: (text: string) => (
      <Space>
        <BookOutlined className="text-blue-500" />
        <Text strong className="text-slate-700">{text}</Text>
      </Space>
    )
  },
  {
    title: 'Fecha Límite',
    dataIndex: 'dateDevolucion',
    key: 'date',
    sorter: (a: Reservation, b: Reservation) => dayjs(a.dateDevolucion).unix() - dayjs(b.dateDevolucion).unix(),
    render: (dateDevolucion: string, record: Reservation) => {
      const isOverdue = dayjs(dateDevolucion).isBefore(dayjs()) && !record.returnedAt;
      
      return (
        <Space direction="vertical" size={0}>
          <Text type={isOverdue ? "danger" : "secondary"} strong={isOverdue}>
            {dayjs(dateDevolucion).format('DD/MM/YYYY')}
          </Text>
          {isOverdue && (
            <Tag color="error" className="border-none bg-red-50 text-red-600 text-[10px] uppercase font-bold">
              ¡Plazo Excedido!
            </Tag>
          )}
        </Space>
      );
    }
  },
  {
    title: 'Acción',
    key: 'action',
    align: 'right' as any,
    render: (_: any, record: Reservation) => (
      <Button
        type="primary"
        icon={<RollbackOutlined />}
        loading={processingId === record.id}
        onClick={() => onReturn(record)}
        className="bg-emerald-600 hover:bg-emerald-700 border-none rounded-md shadow-sm transition-all"
      >
        Devolver
      </Button>
    ),
  },
];