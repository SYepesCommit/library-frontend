'use client';
import React, { useState } from 'react';
import { Table, Typography, Card, Empty } from 'antd';
import { useUserReservations } from '@/src/hooks/useReservations';
import { useUsers } from '@/src/hooks/useUsers';
import { HistoryFilters } from './HistoryFilters';
import { historyColumns } from './HistoryColumns';

const { Title, Text } = Typography;

export const HistoryComponent = () => {

  const [filters, setFilters] = useState({
    userId: undefined as number | undefined,
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
  });

  const { users, isLoading: loadingUsers } = useUsers();
  const { allReservations, isLoading, isError } = useUserReservations(filters.userId);

  const handleDateChange = (dates: any) => {
    setFilters(prev => ({
      ...prev,
      startDate: dates ? dates[0].startOf('day').toISOString() : undefined,
      endDate: dates ? dates[1].endOf('day').toISOString() : undefined,
    }));
  };

  const handleUserChange = (value: number) => {
    setFilters(prev => ({ ...prev, userId: value }));
  };
const filteredData = allReservations.filter((res: any) => {
  if (!filters.startDate || !filters.endDate) return true;
  
  const resDate = new Date(res.dateReservation).getTime();
  const start = new Date(filters.startDate).getTime();
  const end = new Date(filters.endDate).getTime();

  return resDate >= start && resDate <= end;
});

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn px-4 py-8">
      <div className="mb-8">
        <Title level={2} className="!mb-1 flex items-center gap-3 text-slate-800">
          Historial de Movimientos
        </Title>
        <Text className="text-slate-500">Consulta y audita los préstamos históricos del sistema.</Text>
      </div>

      <HistoryFilters
        users={users}
        loadingUsers={loadingUsers}
        onUserChange={handleUserChange}
        onDateChange={handleDateChange}
      />

      <Card className="shadow-md border-none overflow-hidden">
        <Table
          dataSource={filteredData}
          columns={historyColumns}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (total) => `Total: ${total} registros` }}
          locale={{
            emptyText: filters.userId
              ? <Empty description="No hay historial para este usuario" />
              : <Empty description="Selecciona un usuario para ver su historial" />
          }}
        />
      </Card>
    </div>
  );
};