import { pool } from '../config/database.js';

export class LibroRepository {
    async obtenerTodos() {
        const query = `
            SELECT l.id, l.titulo, l.autor, c.nombre AS categoria, l.calificacion, l.anio_publicacion, l.isbn
            FROM libros l
            LEFT JOIN categorias c ON l.categoria_id = c.id
        `;
        const [filas] = await pool.query(query);
        return filas;
    }

    async obtenerPorId(id) {
        const query = `
            SELECT l.id, l.titulo, l.autor, c.nombre AS categoria, l.calificacion, l.anio_publicacion, l.isbn
            FROM libros l
            LEFT JOIN categorias c ON l.categoria_id = c.id
            WHERE l.id = ?
        `;
        const [filas] = await pool.query(query, [id]);
        return filas[0] || null;
    }

    async busquedaAvanzada({ categoria, calificacionMinima, calificacionMaxima, anio }) {
        let query = `
            SELECT l.id, l.titulo, l.autor, c.nombre AS categoria, l.calificacion, l.anio_publicacion, l.isbn
            FROM libros l
            LEFT JOIN categorias c ON l.categoria_id = c.id
            WHERE 1=1
        `;
        const parametros = [];

        if (categoria) {
            query += ` AND c.nombre = ?`;
            parametros.push(categoria);
        }
        if (calificacionMinima) {
            query += ` AND l.calificacion >= ?`;
            parametros.push(calificacionMinima);
        }
        if (calificacionMaxima) {
            query += ` AND l.calificacion <= ?`;
            parametros.push(calificacionMaxima);
        }
        if (anio) {
            query += ` AND l.anio_publicacion >= ?`;
            parametros.push(anio);
        }

        const [filas] = await pool.query(query, parametros);
        return filas;
    }

    async crear({ titulo, autor, categoria_id, calificacion, anio_publicacion, isbn }) {
        const query = `
            INSERT INTO libros (titulo, autor, categoria_id, calificacion, anio_publicacion, isbn)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [resultado] = await pool.query(query, [
            titulo, autor, categoria_id, calificacion || 0.0, anio_publicacion, isbn
        ]);
        return resultado.insertId;
    }
}
