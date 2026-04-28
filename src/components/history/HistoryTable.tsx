import React from 'react';
import { Table, Card, Empty } from 'antd';
import { getHistoryColumns } from './HistoryColumns';
import { HistoryTableProps } from '@/src/types/history';

/**
 * Componente especializado en la representación de datos históricos.
 * Encapsula la lógica visual de la tabla y los estados de Empty.
 * @component
 */
export const HistoryTable = ({ data, mode, loading, entityId }: Readonly<HistoryTableProps>) => {
  return (
    <Card className="shadow-md border-none overflow-hidden">
      <Table
        dataSource={data}
        columns={getHistoryColumns(mode)}
        rowKey="id"
        loading={loading}
        scroll={{ x: 800 }}
        pagination={{ 
          pageSize: 10, 
          responsive: true,
          showTotal: (total) => `Total: ${total} registros`
        }}
        locale={{
          emptyText: (
            <Empty 
              description={
                entityId 
                  ? "No hay registros para este criterio" 
                  : `Selecciona un ${mode === 'user' ? 'usuario' : 'libro'} para auditar`
              } 
            />
          )
        }}
      />
    </Card>
  );
};