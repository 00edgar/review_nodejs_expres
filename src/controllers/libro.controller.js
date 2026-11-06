import { LibroService } from '../services/libro.service.js';

const libroService = new LibroService();

export class LibroController {
    async obtenerTodos(req, res) {
        try {
            const libros = await libroService.listarLibros();
            return res.status(200).json({ exito: true, datos: libros });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const libro = await libroService.obtenerLibro(id);
            return res.status(200).json({ exito: true, datos: libro });
        } catch (error) {
            return res.status(404).json({ exito: false, mensaje: error.message });
        }
    }

    async buscar(req, res) {
        try {
            const { categoria, calificacionMinima, calificacionMaxima, anio } = req.query;

            const datos = await libroService.buscarLibros({
                categoria,
                calificacionMinima: calificacionMinima ? parseFloat(calificacionMinima) : undefined,
                calificacionMaxima: calificacionMaxima ? parseFloat(calificacionMaxima) : undefined,
                anio: anio ? parseInt(anio, 10) : undefined
            });

            return res.status(200).json({ exito: true, datos });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: 'Error al realizar la búsqueda avanzada.' });
        }
    }

    async crear(req, res) {
        try {
            const nuevoLibro = await libroService.registrarLibro(req.body);
            return res.status(201).json({ exito: true, datos: nuevoLibro });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }
}
