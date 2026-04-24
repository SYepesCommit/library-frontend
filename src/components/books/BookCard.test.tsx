import { render, screen, fireEvent } from '@testing-library/react';
import { BookList } from './BookList';
import '@testing-library/jest-dom';

const mockBook = {
  id: 1,
  title: 'Cien años de soledad',
  author: 'Gabriel García Márquez',
  isAvailable: false,
  gender: 'Realismo Mágico'
};

describe('BookCard Component', () => {
  
  test('debe mostrar el estado "Reservado" y deshabilitar el botón cuando no está disponible', () => {
    render(<BookList books={[mockBook]} onReserve={() => {}} />);

    expect(screen.getByText(/Cien años de soledad/i)).toBeInTheDocument();

    expect(screen.getByText(/Reservado/i)).toBeInTheDocument();

    const disabledButton = screen.getByRole('button', { name: /no disponible/i });
    expect(disabledButton).toBeDisabled();
    
    const card = screen.getByText(/Cien años de soledad/i).closest('.ant-card');
    expect(card).toHaveClass('opacity-80');
  });

  test('debe permitir la reserva cuando el libro está disponible', () => {
    const availableBook = { ...mockBook, isAvailable: true };
    const mockOnReserve = jest.fn();

    render(<BookList books={[availableBook]} onReserve={mockOnReserve} />);

    const reserveButton = screen.getByRole('button', { name: /reservar/i });
    expect(reserveButton).not.toBeDisabled();


    fireEvent.click(reserveButton);


    expect(mockOnReserve).toHaveBeenCalledTimes(1);
  });
});