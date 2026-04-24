import { Space, Button, Tag, Popconfirm, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { Book } from '@/src/types/book';

const { Text } = Typography;

export const getBookColumns = (onEdit: (record: Book) => void, onDelete: (id: number) => void) => [
  { 
    title: 'Título', 
    dataIndex: 'title', 
    key: 'title',
    render: (text: string) => (
      <Space>
        <BookOutlined className="text-blue-500" />
        <Text strong>{text}</Text>
      </Space>
    )
  },
  { title: 'Autor', dataIndex: 'author', key: 'author' },
  {
    title: 'Género',
    dataIndex: 'gender',
    key: 'gender',
    render: (gender: string) => <Tag color="blue" className="border-none bg-blue-50 text-blue-600">{gender}</Tag>
  },
  {
    title: 'Estado',
    dataIndex: 'isAvailable',
    key: 'status',
    render: (avail: boolean) => (
      <Tag color={avail ? 'green' : 'red'} className="rounded-full px-3">
        {avail ? 'Libre' : 'Prestado'}
      </Tag>
    )
  },
  {
    title: 'Acciones',
    key: 'actions',
    align: 'right' as any,
    render: (_: any, record: any) => (
      <Space>
        <Button 
          type="text"
          icon={<EditOutlined className="text-blue-600" />} 
          onClick={() => onEdit(record)}
          disabled={!record.isAvailable}
        />
        <Popconfirm 
          title="¿Eliminar libro?" 
          description="Esta acción no se puede deshacer."
          onConfirm={() => onDelete(record.id)}
          okText="Eliminar"
          cancelText="Cancelar"
          disabled={!record.isAvailable}
        >
          <Button 
            type="text"
            danger 
            icon={<DeleteOutlined />} 
            disabled={!record.isAvailable} 
          />
        </Popconfirm>
      </Space>
    )
  }
];