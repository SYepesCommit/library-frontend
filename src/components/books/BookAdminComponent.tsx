'use client';
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useBooks } from '@/src/hooks/useBooks';
import { client } from '@/src/lib/graphql-client';
import { CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK } from '@/src/graphql/books';
import { BookForm } from './BookForm';
import { BookListTable } from './BookListTable';
import toast from 'react-hot-toast';
import { Book } from '@/src/types/book';

/**
 * BookAdminComponent - Orquestador de la administración de libros.
 * * Este componente centraliza la lógica de negocio para la gestión del inventario:
 * - Listado de libros con carga asíncrona.
 * - Creación y actualización mediante un formulario dinámico.
 * - Eliminación de registros con validación de dependencias (reservas activas).
 * - Sincronización de estado global mediante `refreshBooks`.
 * * @returns {JSX.Element} Panel administrativo con estructura Grid responsiva.
 */
export const BookAdminComponent = () => {
  /** Hook personalizado para obtener la lista de libros y el método de invalidación de caché */
  const { books, isLoading, refreshBooks } = useBooks();

  /** Estado que almacena el libro en proceso de edición. Si es null, el formulario actúa para creación. */
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  /** Estado local para gestionar el feedback visual de carga durante las mutaciones (Mutation loading) */
  const [loading, setLoading] = useState(false);

  /**
   * Procesa la persistencia de datos (Creación o Actualización).
   * * @param {Book} values - Datos provenientes del formulario.
   * @description 
   * - Si el objeto `values` tiene un `id`, ejecuta la mutación `UPDATE_BOOK`.
   * - De lo contrario, ejecuta `CREATE_BOOK`.
   * - Al finalizar, resetea el estado de edición y refresca la lista.
   */
  const handleSubmit = async (values: Book) => {
    setLoading(true);
    try {
      if (values.id) {
        const { id, ...updateData } = values;
        await client.request(UPDATE_BOOK, {
          input: { id: Number(id), ...updateData }
        });
        toast.success('Libro actualizado exitosamente');
      } else {
        await client.request(CREATE_BOOK, { input: values });
        toast.success('Libro creado exitosamente');
      }
      setEditingBook(null);
      refreshBooks();
    } catch (err) {
      toast.error('Error en la validación del servidor');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Ejecuta la eliminación de un libro.
   * * @param {number} id - Identificador único del libro a eliminar.
   * @description 
   * El backend protege la integridad referencial; si el libro tiene reservas,
   * la mutación fallará y se notificará al usuario.
   */
  const handleDelete = async (id: number) => {
    try {
      await client.request(DELETE_BOOK, { id: Number(id) });
      toast.success('Libro eliminado');
      refreshBooks();
    } catch (err) {
      toast.error('No se puede eliminar un libro con reservas activas');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fadeIn">
      <Row gutter={[24, 24]}>
        {/* Sección del Formulario (Panel Lateral) */}
        <Col xs={24} lg={8}>
          <div className="sticky top-6">
            {/** * La `key` basada en el id permite resetear el estado interno del formulario 
             * cuando el usuario cambia entre "Editar" y "Nuevo Libro".
             */}
            <BookForm 
              key={editingBook?.id || 'new-book'}
              onSubmit={handleSubmit} 
              loading={loading} 
              initialValues={editingBook} 
            />
          </div>
        </Col>

        {/* Sección de la Tabla (Panel Principal) */}
        <Col xs={24} lg={16}>
          <BookListTable 
            books={books} 
            loading={isLoading} 
            onEdit={setEditingBook} 
            onDelete={handleDelete} 
          />
        </Col>
      </Row>
    </div>
  );
};