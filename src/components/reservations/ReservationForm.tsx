'use client';
import React from 'react';
import { Form, Select, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { User } from '@/src/types/user';
import { ReservationFormProps } from '@/src/types/reservation';
import { useUsers } from '@/src/hooks/useUsers';



export const ReservationForm = ({ book, form, submitting, onFinish, onCancel }: Readonly<ReservationFormProps>) => {
  const { users, isLoading: loadingUsers } = useUsers();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      preserve={false}
      initialValues={{ dateDevolucion: dayjs().add(7, 'day') }}
    >
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-3">
        <span className="text-2xl">📖</span>
        <div>
          <p className="text-base font-semibold text-blue-900 m-0">Libro seleccionado: {book?.title}</p>
        </div>
      </div>

      <Form.Item
        name="userId"
        label={<span className="font-medium">Seleccionar Usuario</span>}
        rules={[{ required: true, message: 'El usuario es obligatorio' }]}
      >
        <Select
          placeholder="Escribe el nombre del usuario..."
          loading={loadingUsers}
          showSearch
          options={users.map((u: User) => ({ value: u.id, label: u.name }))}
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="dateDevolucion"
        label={<span className="font-medium">Fecha de Devolución</span>}
        rules={[{ required: true, message: 'La fecha es obligatoria' }]}
      >
        <DatePicker 
          className="w-full" 
          size="large"
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current < dayjs().endOf('day')} 
        />
      </Form.Item>

      <div className="flex justify-end gap-3 mt-8 pt-4">
        <Button onClick={onCancel} size="large">
          Cancelar
        </Button>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={submitting}
          size="large"
          className="bg-blue-600 hover:bg-blue-700 px-8"
        >
          Confirmar Reserva
        </Button>
      </div>
    </Form>
  );
};