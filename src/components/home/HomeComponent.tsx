'use client';

import { useMemo, useState } from 'react';
import { Typography, Badge, Empty, Card } from 'antd';
import { LoadingState } from '../shared/LoadingState';
import { ErrorState } from '../shared/ErrorState';
import { useBooks } from '@/src/hooks/useBooks';
import { Book } from '@/src/types/book';
import { ReservationModal } from '../reservations/ReservationModal';
import { BookList } from '../books/BookList';
import { BookFilters, BookStatusFilter } from '../books/BookFilters';

const { Title } = Typography;

/**
 * HomeComponent - Componente principal de la vista de catálogo.
 * * Gestiona el ciclo de vida del catálogo de libros incluyendo:
 * - Fetching de datos mediante custom hook `useBooks`.
 * - Lógica de filtrado reactivo (búsqueda por texto y estado).
 * - Orquestación de estados de carga, error y visualización de lista vacía.
 * - Manejo del flujo de reserva a través de un modal.
 * * @returns {JSX.Element} Renderizado de la página principal del catálogo.
 */
export default function HomeComponent() {
  /** Hook personalizado para la gestión de datos de libros y estado de la petición */
  const { books, isLoading, isError, refreshBooks } = useBooks();

  /** Estado para el libro seleccionado actualmente para reservar */
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  /** Control de visibilidad del modal de reserva */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** Texto de entrada para la búsqueda por título o autor */
  const [searchText, setSearchText] = useState('');

  /** Filtro de estado seleccionado (Todos, Disponibles, Reservados) */
  const [statusFilter, setStatusFilter] = useState<BookStatusFilter>('all');

  /**
   * filteredBooks - Lista de libros procesada según los criterios de búsqueda.
   * Se utiliza `useMemo` para evitar cálculos costosos en cada renderizado 
   * si las dependencias no han cambiado.
   */
/**
   * filteredBooks - Lista procesada con filtrado y ordenamiento.
   * 1. Filtrado: Se aplica un filtro que combina búsqueda por texto (título o autor)
   *    y un filtro de estado (disponible, reservado, o todos).
   */
  const filteredBooks = useMemo(() => {
    const filtered = books.filter((book) => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'available' ? book.isAvailable : !book.isAvailable;

      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (a.isAvailable !== b.isAvailable) {
        return a.isAvailable ? -1 : 1;
      }
      
      return a.title.localeCompare(b.title);
    });
  }, [books, searchText, statusFilter]);

  // Manejo de estados globales de la petición
  if (isLoading) return <LoadingState message="Buscando libros disponibles..." />;
  if (isError) return <ErrorState onRetry={() => refreshBooks()} />;

  /**
   * Abre el flujo de reserva para un libro específico.
   * @param {Book} book - El objeto libro que el usuario desea reservar.
   */
  const handleOpenReserve = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header con título dinámico y contador de resultados */}
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="!mb-0 text-slate-800">Catálogo de Libros</Title>
        <Badge 
          count={filteredBooks.length} 
          showZero 
          color="#1677ff" 
          className="scale-110 shadow-sm" 
        />
      </div>

      {/* Componente de filtrado desacoplado */}
      <BookFilters 
        onSearchChange={setSearchText} 
        onStatusChange={setStatusFilter} 
      />

      {/* Renderizado condicional basado en resultados del filtro */}
      {filteredBooks.length > 0 ? (
        <BookList 
          books={filteredBooks} 
          onReserve={handleOpenReserve} 
        />
      ) : (
        <Card className="py-16 flex justify-center border-dashed bg-slate-50">
          <Empty description="No encontramos libros que coincidan con tu búsqueda" />
        </Card>
      )}

      {/* Modal de orquestación de reservas */}
      <ReservationModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refreshBooks()}
      />
    </div>
  );
}