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

/**
 * ReturnsComponent - Módulo para la gestión de devoluciones de libros.
 * * Este componente permite a los administradores:
 * - Filtrar préstamos activos por usuario.
 * - Procesar la devolución física de un libro, actualizando su disponibilidad en tiempo real.
 * - Manejar estados de carga individuales por fila para una mejor experiencia de usuario.
 * * @returns {JSX.Element} Vista de gestión de devoluciones con selector de usuario y tabla reactiva.
 */
export const ReturnsComponent = () => {
  /** ID del usuario seleccionado para consultar libros pendientes de devolución. */
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  
  /** Almacena el ID de la reserva que se está procesando actualmente para mostrar feedback visual en la fila. */
  const [processingId, setProcessingId] = useState<number | null>(null);

  /** Carga de la lista de usuarios para el componente UserSelector. */
  const { users, isLoading: loadingUsers } = useUsers();
  
  /** Hook para obtener solo las reservaciones activas (sin devolver) del usuario seleccionado. */
  const { activeReservations, isLoading: loadingRes, isError, refreshReservations } = useUserReservations(selectedUserId);
  
  /** Método para invalidar la caché del catálogo y reflejar la nueva disponibilidad. */
  const { refreshBooks } = useBooks();

  /**
   * Ejecuta la mutación para marcar un libro como devuelto.
   * * @param {any} record - El objeto de la reservación que contiene el ID y la información del libro.
   * @description
   * Realiza tres acciones clave tras el éxito:
   * 1. Notifica al usuario.
   * 2. Refresca la lista de reservas pendientes del usuario actual.
   * 3. Refresca el catálogo general de libros (isAvailable: true).
   */
  const handleReturn = async (record: any) => {
    setProcessingId(record.id);
    try {
      await client.request(RETURN_BOOK, { id: Number(record.id) });
      toast.success(`Libro "${record.book.title}" devuelto correctamente`);
      
      // Sincronización multi-estado
      refreshReservations(); 
      refreshBooks(); 
    } catch (error) {
      toast.error('Error al procesar la devolución');
    } finally {
      setProcessingId(null);
    }
  };

  /**
   * Memorización de las columnas de la tabla.
   * Se utiliza `useMemo` para evitar que las columnas se regeneren a menos que cambie el estado de procesamiento,
   * manteniendo la referencia de la función `handleReturn`.
   */
  const columns = useMemo(() => getReturnColumns(handleReturn, processingId), [processingId]);

  if (isError) return <ErrorState onRetry={refreshReservations} />;

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto">
      {/* Header Informativo */}
      <div className="flex flex-col mb-8 gap-2">
        <Title level={2} className="!mb-0 text-slate-800">Gestión de Devoluciones</Title>
        <Text className="text-slate-500">Selecciona un usuario para marcar las devoluciones.</Text>
      </div>

      {/* Selector de Usuario (Abstracción de búsqueda) */}
      <UserSelector 
        users={users} 
        loading={loadingUsers} 
        onSelect={setSelectedUserId} 
      />

      {/* Contenedor de la Tabla de Préstamos Activos */}
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