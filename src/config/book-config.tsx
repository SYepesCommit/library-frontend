export const gender = [
  'Ficción', 'No Ficción', 'Ciencia Ficción', 'Fantasía', 
  'Terror', 'Programación', 'Historia', 'Biografía'
];

export const genderOptions = gender.map(g => ({
  label: g,
  value: g
}));

export const statusOptions = [
            { value: 'all', label: 'Todos los libros' },
            { value: 'available', label: 'Disponibles' },
            { value: 'reserved', label: 'Reservados' },
          ]