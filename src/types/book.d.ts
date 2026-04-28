
export type BookStatusFilter = 'all' | 'available' | 'reserved';

export interface Book {
  id: number;
  title: string;
  author: string;
  gender: string;
  isAvailable: boolean;
  reserves?: Reservation[];
}

export interface BookListProps {
  books: Book[];
  onReserve: (book: Book) => void;
}

export interface BookListTableProps {
  books: Book[];
  loading: boolean;
  onEdit: (record: Book) => void;
  onDelete: (id: number) => void;
}

export interface BookFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BookStatusFilter) => void;
}