import { Space, Button, Typography, Tag } from 'antd';
import { BookOutlined, RollbackOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const getReturnColumns = (onReturn: (record: any) => void, processingId: number | null) => [
  {
    title: 'Libro',
    dataIndex: ['book', 'title'],
    key: 'title',
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
    title: 'Acción',
    key: 'action',
    align: 'right' as any,
    render: (_: any, record: any) => (
      <Button
        type="primary"
        icon={<RollbackOutlined />}
        loading={processingId === record.id}
        onClick={() => onReturn(record)}
        className="bg-emerald-600 hover:bg-emerald-700 border-none rounded-md"
      >
        Devolver
      </Button>
    ),
  },
];