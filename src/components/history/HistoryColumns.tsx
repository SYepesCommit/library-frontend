import { Tag } from 'antd';
import dayjs from 'dayjs';
import { Reservation } from '@/src/types/reservation';

/**
 * Genera las columnas dinámicas para la tabla de historial (Auditoría).
 * Implementa ordenamiento avanzado para fechas y entidades relacionadas.
 * * @param {'user' | 'book'} mode - Determina el contexto del historial para ajustar títulos y accesos a datos.
 * @returns {Array} Configuración de columnas para la tabla de historial.
 */
export const getHistoryColumns = (mode: 'user' | 'book') => [
  {
    title: mode === 'user' ? 'Libro Reservado' : 'Usuario que Reservó',
    dataIndex: mode === 'user' ? ['book', 'title'] : ['user', 'name'],
    key: 'entity',
    sorter: (a: Reservation, b: Reservation) => {
      const valA = mode === 'user' ? a.book?.title : a.user?.name;
      const valB = mode === 'user' ? b.book?.title : b.user?.name;
      return (valA ?? '').localeCompare(valB ?? '');
    },
    render: (text: string) => <span className="font-medium text-slate-700">{text}</span>
  },
  {
    title: 'Fecha Reserva',
    dataIndex: 'dateReservation',
    key: 'dateReservation',
    sorter: (a: Reservation, b: Reservation) => 
      dayjs(a.dateReservation).unix() - dayjs(b.dateReservation).unix(),
    render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    responsive: ['md'] as any
  },
  {
    title: 'Fecha Límite',
    dataIndex: 'dateDevolucion',
    key: 'dateDevolucion',
    sorter: (a: Reservation, b: Reservation) => 
      dayjs(a.dateDevolucion).unix() - dayjs(b.dateDevolucion).unix(),
    render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
  },
  {
    title: 'Estado / Entrega',
    dataIndex: 'returnedAt',
    key: 'returnedAt',
    sorter: (a: Reservation, b: Reservation) => {
      if (!a.returnedAt && b.returnedAt) return -1;
      if (a.returnedAt && !b.returnedAt) return 1;
      if (a.returnedAt && b.returnedAt) {
        return dayjs(a.returnedAt).unix() - dayjs(b.returnedAt).unix();
      }
      return 0;
    },
    render: (returnedAt: string) => (
      returnedAt 
        ? <Tag color="blue" className="border-none bg-blue-50 text-blue-600">
            Devuelto el {dayjs(returnedAt).format('DD/MM/YYYY')}
          </Tag>
        : <Tag color="orange" className="border-none bg-orange-50 text-orange-600">
            Activa / En préstamo
          </Tag>
    )
  }
];