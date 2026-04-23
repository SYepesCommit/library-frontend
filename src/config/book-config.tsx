export const gender = [
  'Ficción', 'No Ficción', 'Ciencia Ficción', 'Fantasía', 
  'Terror', 'Programación', 'Historia', 'Biografía'
];

export const genderOptions = gender.map(g => ({
  label: g,
  value: g
}));