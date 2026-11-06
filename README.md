# REVIEW NODE-EXPRESS

Sistema backend modular desarrollado con **Node.js**, **Express** y **MySQL** utilizando ECMAScript Modules (ESM) y la arquitectura por capas original del ecosistema ELARA.

---

##  Arquitectura del Proyecto

```text
elara-books/
├── database/
│   └── schema.sql          # Script SQL con DDL y datos de prueba (seed)
├── exports/                # Carpeta física donde se generan los archivos CSV
├── src/
│   ├── config/
│   │   └── database.js     # Configuración de la conexión MySQL (pool)
│   ├── controllers/
│   │   ├── libro.controller.js
│   │   └── resena.controller.js
│   ├── services/
│   │   ├── libro.service.js
│   │   └── resena.service.js
│   ├── repositories/
│   │   ├── libro.repository.js
│   │   └── resena.repository.js
│   └── routes/
│       ├── libro.routes.js
│       └── resena.routes.js
├── .env.example            # Ejemplo de variables de entorno
├── index.js                # Archivo principal de inicio de la aplicación
├── package.json
└── README.md
```

---

##  Configuración e Instalación

1. **Base de Datos:**
   - Importa el archivo `database/schema.sql` en tu servidor MySQL.
2. **Variables de Entorno:**
   - Copia `.env.example` a `.env` y ajusta las credenciales de la base de datos.
3. **Instalación de Dependencias:**
   ```bash
   npm install
   ```
4. **Ejecución del Servidor:**
   ```bash
   npm start
   ```

---

##  Endpoints de la API

### Libros (`/api/libros`)
- `GET /api/libros` - Obtener todos los libros.
- `GET /api/libros/:id` - Obtener un libro por ID.
- `GET /api/libros/buscar` - Búsqueda avanzada con filtros dinámicos (`categoria`, `calificacionMinima`, `calificacionMaxima`, `anio`).
  - *Ejemplo:* `/api/libros/buscar?categoria=Ciencia%20Ficción&calificacionMinima=4.5&anio=1960`
- `POST /api/libros` - Registrar un nuevo libro.

### Reseñas (`/api/resenas`)
- `GET /api/resenas/libro/:libroId` - Obtener reseñas de un libro.
- `GET /api/resenas/exportar/:libroId` - Generar archivo CSV en el servidor dentro de la carpeta `/exports`.
git 