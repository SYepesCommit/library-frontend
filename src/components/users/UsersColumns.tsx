import { Space, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const userColumns = [
  {
    title: 'Lector',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <Space>
        <Avatar size="small" icon={<UserOutlined />} className="bg-blue-500" />
        <Text strong>{text}</Text>
      </Space>
    ),
  },
  {
    title: 'Correo Electrónico',
    dataIndex: 'email',
    key: 'email',
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
];