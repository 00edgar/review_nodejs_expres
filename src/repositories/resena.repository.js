import { pool } from '../config/database.js';

export class ResenaRepository {
    async obtenerPorLibroId(libroId) {
        const query = `
            SELECT u.nombre AS usuario, r.calificacion, r.comentario, r.fecha_creacion
            FROM resenas r
            INNER JOIN usuarios u ON r.usuario_id = u.id
            WHERE r.libro_id = ?
        `;
        const [filas] = await pool.query(query, [libroId]);
        return filas;
    }

    async crear({ libro_id, usuario_id, calificacion, comentario }) {
        const query = `
            INSERT INTO resenas (libro_id, usuario_id, calificacion, comentario)
            VALUES (?, ?, ?, ?)
        `;
        const [resultado] = await pool.query(query, [libro_id, usuario_id, calificacion, comentario]);
        return resultado.insertId;
    }
}
