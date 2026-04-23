import { render, screen, fireEvent } from '@testing-library/react';
import { BookList } from './BookList'; // Asegúrate que el nombre coincida
import '@testing-library/jest-dom';

const mockBook = {
  id: 1,
  title: 'Cien años de soledad',
  author: 'Gabriel García Márquez',
  isAvailable: false, // Caso de libro no disponible
  genre: 'Realismo Mágico'
};

describe('BookCard Component', () => {
  
  test('debe mostrar el estado "Reservado" y deshabilitar el botón cuando no está disponible', () => {
    render(<BookList books={[mockBook]} onReserve={() => {}} />);

    // 1. Validar que el título sea visible
    expect(screen.getByText(/Cien años de soledad/i)).toBeInTheDocument();

    // 2. Validar el Tag de estado (vimos que dice "Reservado" en tu HTML)
    expect(screen.getByText(/Reservado/i)).toBeInTheDocument();

    // 3. Validar que el botón diga "No Disponible" y esté deshabilitado
    const disabledButton = screen.getByRole('button', { name: /no disponible/i });
    expect(disabledButton).toBeDisabled();
    
    // 4. Validar que tenga la clase de opacidad que vimos en consola
    const card = screen.getByText(/Cien años de soledad/i).closest('.ant-card');
    expect(card).toHaveClass('opacity-80');
  });

  test('debe permitir la reserva cuando el libro está disponible', () => {
    const availableBook = { ...mockBook, isAvailable: true };
    const mockOnReserve = jest.fn();

    render(<BookList books={[availableBook]} onReserve={mockOnReserve} />);

    // 1. Validar que el botón ahora diga "Reservar" (o el texto que tengas para disponible)
    const reserveButton = screen.getByRole('button', { name: /reservar/i });
    expect(reserveButton).not.toBeDisabled();

    // 2. Simular el click
    fireEvent.click(reserveButton);

    // 3. Verificar que se llamó a la función
    expect(mockOnReserve).toHaveBeenCalledTimes(1);
  });
});