'use client';
import React, { useState, useMemo } from 'react';
import { Typography, Segmented } from 'antd';
import dayjs from 'dayjs';
import { useUserReservations } from '@/src/hooks/useReservations';
import { useUsers } from '@/src/hooks/useUsers';
import { useBooks } from '@/src/hooks/useBooks';
import { useBookReservations } from '@/src/hooks/useBookReservations';
import { HistoryFilters } from './HistoryFilters';
import { HistoryTable } from './HistoryTable'; // Importación del nuevo componente
import { User } from '@/src/types/user';
import { Book } from '@/src/types/book';
import { historyOptions } from '@/src/config/history-config';

const { Title, Text } = Typography;

/**
 * HistoryComponent - Orquestador del Módulo de Auditoría.
 * Gestiona el estado global de los filtros y la coordinación entre 
 * las queries de GraphQL y la UI.
 * @component
 */
export const HistoryComponent = () => {
  const [mode, setMode] = useState<'user' | 'book'>('user');
  const [rawDates, setRawDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [filters, setFilters] = useState({
    entityId: undefined as number | undefined,
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
  });

  const { users, isLoading: loadingUsers } = useUsers();
  const { books, isLoading: loadingBooks } = useBooks();

  const userQuery = useUserReservations(mode === 'user' ? filters.entityId : undefined);
  const bookQuery = useBookReservations(mode === 'book' ? filters.entityId : undefined);

  const { allReservations, isLoading } = mode === 'user' ? userQuery : bookQuery;

  const handleDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    setRawDates(dates);
    setFilters(prev => ({
      ...prev,
      startDate: dates?.[0] ? dates[0].startOf('day').toISOString() : undefined,
      endDate: dates?.[1] ? dates[1].endOf('day').toISOString() : undefined,
    }));
  };

  const handleEntityChange = (value: number) => {
    setFilters(prev => ({ ...prev, entityId: value }));
  };

  const filteredData = useMemo(() => {
    if (!allReservations) return [];
    return allReservations.filter((res: { dateReservation: string }) => {
      if (!filters.startDate || !filters.endDate) return true;
      const resDate = new Date(res.dateReservation).getTime();
      const start = new Date(filters.startDate).getTime();
      const end = new Date(filters.endDate).getTime();
      return resDate >= start && resDate <= end;
    });
  }, [allReservations, filters.startDate, filters.endDate]);

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn px-4 py-8">
      <div className="mb-8">
        <Title level={2} className="!mb-1 text-slate-800">Historial de Movimientos</Title>
        <Text className="text-slate-500">Auditoría completa de préstamos por usuario o ejemplar.</Text>
      </div>

      <Segmented
        block
        size="large"
        className="mb-6 shadow-sm"
        options={historyOptions}
        onChange={(val) => {
          setMode(val as 'user' | 'book');
          setFilters({ entityId: undefined, startDate: undefined, endDate: undefined });
          setRawDates(null); 
        }}
      />

      <HistoryFilters
        mode={mode}
        entityId={filters.entityId}
        dateValues={rawDates}
        data={mode === 'user' 
          ? users?.map((user: User) => ({ label: user.name, value: user.id })) 
          : books?.map((book: Book) => ({ label: book.title, value: book.id }))
        }
        loading={mode === 'user' ? loadingUsers : loadingBooks}
        onEntityChange={handleEntityChange}
        onDateChange={handleDateChange}
      />

      <HistoryTable 
        data={filteredData} 
        mode={mode} 
        loading={isLoading} 
        entityId={filters.entityId} 
      />
    </div>
  );
};