'use client';
import React from 'react';
import { Form, Select, DatePicker, Button, Divider, Typography } from 'antd';
import dayjs from 'dayjs';
import { User } from '@/src/types/user';
import { ReservationFormProps } from '@/src/types/reservation';

const { Text } = Typography;

/**
 * Componente de presentación que renderiza los campos del formulario de reserva.
 * Cumple con el requisito de solicitar: Usuario, Libro, Fecha Reserva y Fecha Devolución.
 */
export const ReservationForm = ({
  book,
  form,
  submitting,
  onFinish,
  onCancel,
  users,
  loadingUsers
}: ReservationFormProps & { users: User[], loadingUsers: boolean }) => {

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        dateReservation: dayjs(),
        dateDevolucion: dayjs().add(7, 'day')
      }}
    >
      <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <Text type="secondary" className="text-xs uppercase block mb-1">Libro a Reservar</Text>
        <Text strong className="text-lg text-blue-800">{book?.title}</Text>
      </div>

      <Form.Item
        name="userId"
        label={<span className="font-semibold text-slate-700">Seleccionar Usuario</span>}
        rules={[{ required: true, message: 'Debe seleccionar un usuario' }]}
      >
        <Select
          placeholder="Escribe el nombre del usuario..."
          loading={loadingUsers}
          showSearch
          options={users.map((u: User) => ({ value: u.id, label: u.name }))}
          size="large"
        />
      </Form.Item>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <Form.Item
          name="dateReservation"
          label={<span className="font-semibold text-slate-700">Fecha de Reserva (Fecha de hoy por defecto)</span>}
          rules={[{ required: true, message: 'Campo obligatorio' }]}
        >
          <DatePicker
            className="w-full"
            size="large"
            format="DD/MM/YYYY"
          />
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <Form.Item
          name="dateDevolucion"
          label={<span className="font-semibold text-slate-700">Fecha de Devolución (7 días después de la reserva)</span>}
          rules={[
            { required: true, message: 'Campo obligatorio' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const reservationDate = getFieldValue('dateReservation');
                if (!value || !reservationDate || value.isAfter(reservationDate)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Debe ser posterior a la reserva'));
              },
            }),
          ]}
        >
          <DatePicker
            className="w-full"
            size="large"
            format="DD/MM/YYYY"
            disabledDate={(current) => current && current < dayjs().startOf('day')}
          />
        </Form.Item>
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-4">
        <Button onClick={onCancel} size="large">Cancelar</Button>
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