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
    /** Objeto del libro seleccionado para la transacción. */
    book: Book | null;
    /** Control de visibilidad del modal desde el componente padre. */
    isOpen: boolean;
    /** Callback para cerrar el modal sin realizar acciones. */
    onClose: () => void;
    /** Callback para notificar éxito y disparar el refresco de datos en la vista principal. */
    onSuccess: () => void;
}

/**
 * ReservationModal - Orquestador del proceso de reserva de libros.
 * * Este componente actúa como un contenedor (Container Component) que:
 * - Gestiona el estado de envío (submitting) a la API.
 * - Transforma los datos del formulario (como fechas de Dayjs) al formato ISO requerido por GraphQL.
 * - Maneja las respuestas del servidor y las notificaciones al usuario (Toast).
 * - Limpia el estado del formulario tras una operación exitosa.
 * * @param {ReservationModalProps} props - Propiedades para el control del flujo de reserva.
 */
export const ReservationModal = ({ book, isOpen, onClose, onSuccess }: ReservationModalProps) => {
    /** Instancia del formulario de Ant Design para control programático (reset, validación). */
    const [form] = Form.useForm();
    
    /** Estado local para deshabilitar botones y mostrar indicadores de carga durante la mutación. */
    const [submitting, setSubmitting] = useState(false);

    /**
     * Procesa la creación de la reserva en el backend.
     * * @param {Object} values - Valores recolectados por el ReservationForm.
     * @param {string} values.userId - ID del usuario lector seleccionado.
     * @param {dayjs.Dayjs} values.dateDevolucion - Objeto fecha de retorno esperado.
     */
    const handleSubmit = async (values: { userId: string; dateDevolucion: dayjs.Dayjs, bookId: number }) => {
        setSubmitting(true);
        try {
            // Transformación de datos y llamada a la API
            await client.request(CREATE_RESERVATION, {
                input: {
                    bookId: Number(book?.id),
                    userId: Number(values.userId),
                    dateDevolucion: values.dateDevolucion.toISOString(), // Conversión necesaria para el esquema de fecha
                }
            });

            // Feedback positivo y limpieza de flujo
            toast.success(`Reserva exitosa: ${book?.title}`, { duration: 3000 });
            form.resetFields();
            onSuccess(); // Dispara el refreshBooks() del HomeComponent
            onClose();
        } catch (error: any) {
            // Manejo de errores específicos del servidor (ej: Libro ya reservado)
            const errorMsg = error.response?.errors?.[0]?.message || 'Error en la reserva';
            toast.error(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            title={null} // Se oculta el título por defecto para usar un diseño personalizado en el body
            open={isOpen}
            onCancel={onClose}
            footer={null} // Se delegan los botones de acción al ReservationForm para mayor control de layout
            width={500}
            centered
        >
            <div className="p-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Procesar Reserva</h2>
                
                {/** Componente de presentación que renderiza los campos del formulario. */}
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