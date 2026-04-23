export interface Reservation {
  id: number;
  dateReservation: string;
  dateDevolucion: string;
  returnedAt?: string;
  user?: User;
  book?: Book;
}

export interface ReservationModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface ReservationFormProps {
  book: Book | null;
  form: FormInstance;
  submitting: boolean;
  onFinish: (values: any) => void;
  onCancel: () => void;
}

export interface FilterProps {
  userId?: number;
  startDate?: string;
  endDate?: string;
}
