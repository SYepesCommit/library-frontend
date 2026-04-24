#  Library Management System - Frontend

Interfaz de usuario moderna y profesional para la gestión de bibliotecas, construida como parte de la prueba técnica para **Grupo Nex**. Esta aplicación se comunica con una API GraphQL para gestionar el ciclo de vida de préstamos de libros.

##  Características Principales

- **Dashboard de Libros:** Visualización de disponibilidad en tiempo real.
- **Gestión de Usuarios:** Registro de nuevos lectores.
- **Sistema de Reservas:** Flujo intuitivo con validaciones de negocio (Máximo 3 libros).
- **Control de Devoluciones:** Interfaz para liberar libros con alertas de plazos excedidos.
- **Historial Avanzado:** Consultas con filtros por rango de fechas.

## Stack Tecnológico

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router).
- **Lenguaje:** TypeScript.
- **Estilos:** Tailwind CSS.
- **Componentes de UI:** Ant Design (v5).
- **Cliente API:** GraphQL Request.
- **Notificaciones:** React Hot Toast.

---

### Prerrequisitos de Sistema
- Antes de iniciar la interfaz, asegúrate de contar con:

- Node.js Runtime: v20.x o superior.

- PNPM: Gestor de paquetes recomendado (instalar con npm install -g pnpm).

- Backend Activo: El servidor de la API (NestJS) debe estar corriendo para que el Frontend pueda consumir los datos.


## 1. Instalación y Ejecución
Clonar el repositorio:

```env
git clone https://github.com/SYepesCommit/library-frontend.git
```


##  2. Configuración del Entorno

Para que el frontend se comunique correctamente con el backend, debes configurar las variables de entorno.

1. Crea un archivo `.env` en la raíz de este proyecto.
2. Añade la URL de tu servidor GraphQL (NestJS) (El puerto puede variar en cuestion del ambiente de prueba que este corriendo, ajustar el puerto si es necesario):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/graphql
```

3. Instalar dependencias:

```env
pnpm install
```

4. Iniciar en modo desarrollo:
```env
pnpm dev
```

## La aplicación se abrirá en http://localhost:3000.

## Estructura de Carpetas
- app/: Rutas y páginas principales (Next.js App Router).
- src/components/: Componentes segmentados por módulos (Books, Users, Reservations).
- src/graphql/: Definición de Queries y Mutations.
- src/hooks/: Hooks personalizados para la gestión de datos (SWR/Fetch).
- src/lib/: Configuración del cliente GraphQL.

