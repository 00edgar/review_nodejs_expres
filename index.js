import express from 'express';
import dotenv from 'dotenv';
import libroRoutes from './src/routes/libro.routes.js';
import resenaRoutes from './src/routes/resena.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Registro de rutas
app.use('/api/libros', libroRoutes);
app.use('/api/resenas', resenaRoutes);

// Manejo de ruta raíz
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a ELARA Books API',
        estado: 'Activo'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ELARA Books ejecutándose en el puerto ${PORT}`);
});
