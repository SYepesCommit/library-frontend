import { Space, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '@/src/types/user';

const { Text } = Typography;

/**
 * Configuración de columnas para la tabla de Lectores/Usuarios.
 * Permite la organización alfabética por nombre y correo electrónico.
 * @type {Array}
 */
export const userColumns = [
  {
    title: 'Lector',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    render: (text: string) => (
      <Space>
        <Avatar size="small" icon={<UserOutlined />} className="bg-blue-500" />
        <Text strong className="text-slate-700">{text}</Text>
      </Space>
    ),
  },
  {
    title: 'Correo Electrónico',
    dataIndex: 'email',
    key: 'email',
    sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
];