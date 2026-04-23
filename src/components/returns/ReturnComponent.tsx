'use client';
import React, { useState, useMemo } from 'react';
import { Table, Typography, Card } from 'antd';
import { useBooks } from '@/src/hooks/useBooks';
import { useUsers } from '@/src/hooks/useUsers';
import { useUserReservations } from '@/src/hooks/useReservations';
import { client } from '@/src/lib/graphql-client';
import { RETURN_BOOK } from '@/src/graphql/reservations';
import { ErrorState } from '../shared/ErrorState';
import toast from 'react-hot-toast';
import { getReturnColumns } from './ReturnColumns';
import { UserSelector } from './ReturnUserSelector';

const { Title, Text } = Typography;

export const ReturnsComponent = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [processingId, setProcessingId] = useState<number | null>(null);

  const { users, isLoading: loadingUsers } = useUsers();
  const { activeReservations, isLoading: loadingRes, isError, refreshReservations } = useUserReservations(selectedUserId);
  const { refreshBooks } = useBooks();

  const handleReturn = async (record: any) => {
    setProcessingId(record.id);
    try {
      await client.request(RETURN_BOOK, { id: Number(record.id) });
      toast.success(`Libro "${record.book.title}" devuelto correctamente`);
      refreshReservations(); 
      refreshBooks(); 
    } catch (error) {
      toast.error('Error al procesar la devolución');
    } finally {
      setProcessingId(null);
    }
  };

  const columns = useMemo(() => getReturnColumns(handleReturn, processingId), [processingId]);

  if (isError) return <ErrorState onRetry={refreshReservations} />;

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto">
      <div className="flex flex-col mb-8 gap-2">
        <Title level={2} className="!mb-0 text-slate-800">Gestión de Devoluciones</Title>
        <Text className="text-slate-500">Selecciona un usuario para marcar las devoluciones.</Text>
      </div>

      <UserSelector 
        users={users} 
        loading={loadingUsers} 
        onSelect={setSelectedUserId} 
      />

      <Card 
        className="shadow-sm border-slate-100 overflow-hidden" 
        title={<Text strong>Libros por entregar</Text>}
      >
        <Table 
          dataSource={activeReservations} 
          columns={columns} 
          rowKey="id"
          loading={loadingRes}
          pagination={{ pageSize: 5, hideOnSinglePage: true }}
          locale={{ 
            emptyText: selectedUserId 
              ? 'Este usuario no tiene libros pendientes.' 
              : 'Selecciona un usuario arriba para ver sus préstamos.' 
          }}
        />
      </Card>
    </div>
  );
};