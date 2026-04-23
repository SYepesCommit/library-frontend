'use client';

import { useMemo, useState } from 'react';
import { Typography, Badge } from 'antd';
import { LoadingState } from '../shared/LoadingState';
import { ErrorState } from '../shared/ErrorState';
import { useBooks } from '@/src/hooks/useBooks';
import { Book } from '@/src/types/book';
import { ReservationModal } from '../reservations/ReservationModal';
import { BookList } from '../books/BookList';


const { Title, Text } = Typography;

export default function HomeComponent() {
    const { books, isLoading, isError, refreshBooks } = useBooks();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenReserve = (book: Book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    if (isLoading) return <LoadingState message="Buscando libros disponibles..." />;

    if (isError) return <ErrorState onRetry={() => refreshBooks()} />;

    return (
        <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <Title level={2} className="!mb-0 text-slate-800">Catálogo de Libros</Title>
                </div>
                <Badge count={books.length} showZero color="#1677ff" className="scale-110 shadow-sm" />
            </div>

            <BookList
                books={books}
                onReserve={handleOpenReserve}
            />
            <ReservationModal
                book={selectedBook}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => refreshBooks()}
            />
        </div>
    );
}