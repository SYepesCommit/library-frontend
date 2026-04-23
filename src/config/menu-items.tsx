import { 
  HomeOutlined, BookOutlined, UserOutlined, 
  HistoryOutlined, RollbackOutlined 
} from '@ant-design/icons';

export const MENU_ITEMS = [
  { key: '/', icon: <HomeOutlined />, label: 'Catálogo' },
  { key: '/books', icon: <BookOutlined />, label: 'Gestión Libros' },
  { key: '/users', icon: <UserOutlined />, label: 'Usuarios' },
  { key: '/history', icon: <HistoryOutlined />, label: 'Historial' },
  { key: '/returns', icon: <RollbackOutlined />, label: 'Devoluciones' },
];