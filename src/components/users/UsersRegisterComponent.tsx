'use client';
import React from 'react';
import { Row, Col } from 'antd';
import { useUsers } from '@/src/hooks/useUsers';
import { UserListTable } from './UserListTable';
import { UserRegisterForm } from './UserRegisterForm';

export const UsersRegisterComponent = () => {
  const { users, isLoading: loadingUsers, refreshUsers } = useUsers();

  return (
    <div className="max-w-7xl mx-auto p-4 animate-fadeIn">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <UserRegisterForm onSuccess={refreshUsers} />
        </Col>

        <Col xs={24} lg={16}>
          <UserListTable users={users} loading={loadingUsers} />
        </Col>
      </Row>
    </div>
  );
};