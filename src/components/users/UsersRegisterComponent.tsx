'use client';
import React from 'react';
import { Row, Col } from 'antd';
import { useUsers } from '@/src/hooks/useUsers';
import { UserListTable } from './UserListTable';
import { UserRegisterForm } from './UserRegisterForm';

/**
 * UsersRegisterComponent - Módulo principal para la gestión de membresías.
 * * Este componente orquesta el registro y la visualización de los lectores del sistema.
 * Implementa un patrón de "Levantamiento de Estado" (Lifting State Up) mediante:
 * - Un formulario de registro que dispara una actualización tras el éxito.
 * - Una tabla reactiva que refleja los cambios en tiempo real.
 * * @returns {JSX.Element} Vista de gestión de usuarios con layout dividido (Formulario/Tabla).
 */
export const UsersRegisterComponent = () => {
  /** * Hook personalizado que encapsula la lógica de fetching de usuarios 
   * y proporciona el método `refreshUsers` para invalidar la caché de la lista.
   */
  const { users, isLoading: loadingUsers, refreshUsers } = useUsers();

  return (
    <div className="max-w-7xl mx-auto p-4 animate-fadeIn">
      {/* Sistema de rejilla (Grid) responsiva de Ant Design */}
      <Row gutter={[24, 24]}>
        
        {/* Columna de Registro: Sticky para mantener el formulario visible durante el scroll */}
        <Col xs={24} lg={8}>
          <div className="sticky top-6">
            {/** * Componente de registro. 
             * @param {Function} onSuccess - Callback que refresca la lista de usuarios
             * al completar un registro exitoso en el backend.
             */}
            <UserRegisterForm onSuccess={refreshUsers} />
          </div>
        </Col>

        {/* Columna de Listado: Visualización de la data maestra de usuarios */}
        <Col xs={24} lg={16}>
          <UserListTable 
            users={users} 
            loading={loadingUsers} 
          />
        </Col>
        
      </Row>
    </div>
  );
};