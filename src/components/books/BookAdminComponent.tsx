'use client';
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useBooks } from '@/src/hooks/useBooks';
import { client } from '@/src/lib/graphql-client';
import { CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK } from '@/src/graphql/books';
import { BookForm } from './BookForm';
import { BookListTable } from './BookListTable';
import toast from 'react-hot-toast';

export const BookAdminComponent = () => {
  const {books, isLoading, refreshBooks } = useBooks();
  const [editingBook, setEditingBook] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
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
        <Col xs={24} lg={8}>
          <div className="sticky top-6">
            <BookForm 
              key={editingBook?.id || 'new-book'}
              onSubmit={handleSubmit} 
              loading={loading} 
              initialValues={editingBook} 
            />
          </div>
        </Col>
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