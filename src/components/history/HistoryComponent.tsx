'use client';
import React, { useState } from 'react';
import { Table, Typography, Card, Empty } from 'antd';
import { useUserReservations } from '@/src/hooks/useReservations';
import { useUsers } from '@/src/hooks/useUsers';
import { HistoryFilters } from './HistoryFilters';
import { historyColumns } from './HistoryColumns';

const { Title, Text } = Typography;

/**
 * HistoryComponent - Módulo de Auditoría y Consulta de Préstamos.
 * * Este componente permite visualizar el historial completo de reservaciones.
 * Implementa un flujo de filtrado mixto:
 * 1. Servidor: Filtra por `userId` a través de la query de GraphQL.
 * 2. Cliente: Filtra por rango de fechas para optimizar la reactividad de la tabla.
 * * @returns {JSX.Element} Vista de historial con filtros avanzados y tabla de datos.
 */
export const HistoryComponent = () => {

  /** * Estado de los criterios de búsqueda.
   * Se inicializan como undefined para permitir que la API retorne datos generales o vacíos 
   * según la lógica de negocio.
   */
  const [filters, setFilters] = useState({
    userId: undefined as number | undefined,
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
  });

  /** Carga de la lista de usuarios para el selector de filtros */
  const { users, isLoading: loadingUsers } = useUsers();

  /** * Obtención de reservaciones. 
   * Reacciona automáticamente cuando `filters.userId` cambia, disparando una nueva petición.
   */
  const { allReservations, isLoading, isError } = useUserReservations(filters.userId);

  /**
   * Maneja el cambio de fechas desde el RangePicker de Ant Design.
   * @param {any} dates - Array de objetos Dayjs proporcionados por el componente DatePicker.
   */
  const handleDateChange = (dates: any) => {
    setFilters(prev => ({
      ...prev,
      startDate: dates ? dates[0].startOf('day').toISOString() : undefined,
      endDate: dates ? dates[1].endOf('day').toISOString() : undefined,
    }));
  };

  /**
   * Actualiza el usuario seleccionado para la consulta.
   * @param {number} value - ID del usuario.
   */
  const handleUserChange = (value: number) => {
    setFilters(prev => ({ ...prev, userId: value }));
  };

  /**
   * filteredData - Lógica de filtrado en cliente para el rango de fechas.
   * Se procesa la lista obtenida de la API para ajustarla al rango seleccionado por el usuario.
   */
  const filteredData = allReservations.filter((res: any) => {
    if (!filters.startDate || !filters.endDate) return true;
    
    const resDate = new Date(res.dateReservation).getTime();
    const start = new Date(filters.startDate).getTime();
    const end = new Date(filters.endDate).getTime();

    return resDate >= start && resDate <= end;
  });

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn px-4 py-8">
      {/* Encabezado de página */}
      <div className="mb-8">
        <Title level={2} className="!mb-1 flex items-center gap-3 text-slate-800">
          Historial de Movimientos
        </Title>
        <Text className="text-slate-500">Consulta y audita los préstamos históricos del sistema.</Text>
      </div>

      {/* Componente de Filtros (Abstracción de controles de usuario) */}
      <HistoryFilters
        users={users}
        loadingUsers={loadingUsers}
        onUserChange={handleUserChange}
        onDateChange={handleDateChange}
      />

      <Card className="shadow-md border-none overflow-hidden">
        {/* Tabla de registros con configuración de paginación y estados vacíos personalizados */}
        <Table
          dataSource={filteredData}
          columns={historyColumns}
          rowKey="id"
          loading={isLoading}
          scroll={{ x: 800 }}
          pagination={{ 
            pageSize: 10, 
            showTotal: (total) => `Total: ${total} registros`,
            responsive: true 
          }}
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