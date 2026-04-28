'use client';
import React from 'react';
import { Modal, Form } from 'antd';
import { ReservationForm } from './ReservationForm';
import { useCreateReservation } from '@/src/hooks/useCreateReservation';
import { useUsers } from '@/src/hooks/useUsers';
import toast from 'react-hot-toast';
import { ReservationModalProps } from '@/src/types/reservation';


export const ReservationModal = ({ book, isOpen, onClose, onSuccess }: Readonly<ReservationModalProps>) => {
    const [form] = Form.useForm();
    const { createReservation, isSubmitting } = useCreateReservation();
    const { users, isLoading: loadingUsers } = useUsers();

    const handleSubmit = async (values: any) => {
        try {
            await createReservation({
                bookId: Number(book?.id),
                userId: Number(values.userId),
                dateReservation: values.dateReservation.toISOString(),
                dateDevolucion: values.dateDevolucion.toISOString(),
            });

            toast.success(`Reserva procesada exitosamente`);
            form.resetFields();
            onSuccess();
            onClose();
        } catch (error: any) {
            const errorMsg = error.response?.errors?.[0]?.message || 'Error al procesar la reserva';
            toast.error(errorMsg);
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={550}
            centered
            destroyOnClose
        >
            <div className="p-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Configurar Reserva</h2>
                <ReservationForm
                    book={book}
                    form={form}
                    submitting={isSubmitting}
                    onFinish={handleSubmit}
                    onCancel={onClose}
                    users={users}
                    loadingUsers={loadingUsers}
                />
            </div>
        </Modal>
    );
};