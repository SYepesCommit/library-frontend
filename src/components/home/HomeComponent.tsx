'use client';

import { useMemo, useState } from 'react';
import { Typography, Badge, Empty, Card } from 'antd';
import { LoadingState } from '../shared/LoadingState';
import { ErrorState } from '../shared/ErrorState';
import { useBooks } from '@/src/hooks/useBooks';
import { Book } from '@/src/types/book';
import { ReservationModal } from '../reservations/ReservationModal';
import { BookList } from '../books/BookList';
import { BookFilters, BookStatusFilter } from '../books/BookFilters'; // Importamos el nuevo hijo

const { Title } = Typography;

export default function HomeComponent() {
  const { books, isLoading, isError, refreshBooks } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookStatusFilter>('all');

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'available' ? book.isAvailable : !book.isAvailable;

      return matchesSearch && matchesStatus;
    });
  }, [books, searchText, statusFilter]);

  if (isLoading) return <LoadingState message="Buscando libros disponibles..." />;
  if (isError) return <ErrorState onRetry={() => refreshBooks()} />;

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="!mb-0 text-slate-800">Catálogo de Libros</Title>
        <Badge count={filteredBooks.length} showZero color="#1677ff" className="scale-110 shadow-sm" />
      </div>

      <BookFilters 
        onSearchChange={setSearchText} 
        onStatusChange={setStatusFilter} 
      />

      {filteredBooks.length > 0 ? (
        <BookList books={filteredBooks} onReserve={(book) => {
          setSelectedBook(book);
          setIsModalOpen(true);
        }} />
      ) : (
        <Card className="py-16 flex justify-center border-dashed bg-slate-50">
          <Empty description="No encontramos libros que coincidan con tu búsqueda" />
        </Card>
      )}

      <ReservationModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refreshBooks()}
      />
    </div>
  );
}