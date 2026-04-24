'use client';
import React, { useState } from 'react';
import { Modal, Form } from 'antd';
import { ReservationForm } from './ReservationForm';
import { CREATE_RESERVATION } from '@/src/graphql/reservations';
import { client } from '@/src/lib/graphql-client';
import { Book } from '@/src/types/book';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

interface ReservationModalProps {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const ReservationModal = ({ book, isOpen, onClose, onSuccess }: ReservationModalProps) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (values: { userId: string; dateDevolucion: dayjs.Dayjs, bookId: number }) => {
        setSubmitting(true);
        try {
            await client.request(CREATE_RESERVATION, {
                input: {
                    bookId: Number(book?.id),
                    userId: Number(values.userId),
                    dateDevolucion: values.dateDevolucion.toISOString(),
                }
            });

            toast.success(`Reserva exitosa: ${book?.title}`, { duration: 3000 });
            form.resetFields();
            onSuccess();
            onClose();
        } catch (error: any) {
            const errorMsg = error.response?.errors?.[0]?.message || 'Error en la reserva';
            toast.error(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            title={null}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={500}
            centered
        >
            <div className="p-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Procesar Reserva</h2>
                <ReservationForm
                    book={book}
                    form={form}
                    submitting={submitting}
                    onFinish={handleSubmit}
                    onCancel={onClose}
                />
            </div>
        </Modal>
    );
};