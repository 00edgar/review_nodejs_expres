import fs from 'fs';
import path from 'path';
import { ResenaRepository } from '../repositories/resena.repository.js';
import { LibroRepository } from '../repositories/libro.repository.js';

const resenaRepository = new ResenaRepository();
const libroRepository = new LibroRepository();

export class ResenaService {
    async obtenerResenasPorLibro(libroId) {
        return await resenaRepository.obtenerPorLibroId(libroId);
    }

    async crearResena(datosResena) {
        return await resenaRepository.crear(datosResena);
    }

    async exportarResenasCSV(libroId) {
        const libro = await libroRepository.obtenerPorId(libroId);
        if (!libro) {
            throw new Error('El libro especificado no existe.');
        }

        const resenas = await resenaRepository.obtenerPorLibroId(libroId);

        const directorioExportaciones = path.resolve('exports');
        if (!fs.existsSync(directorioExportaciones)) {
            fs.mkdirSync(directorioExportaciones, { recursive: true });
        }

        const nombreArchivo = `resenas-libro-${libroId}-${Date.now()}.csv`;
        const rutaArchivo = path.join(directorioExportaciones, nombreArchivo);

        let contenidoCSV = 'Usuario,Calificacion,Comentario,Fecha\n';

        resenas.forEach(r => {
            const comentarioSanetizado = `"${(r.comentario || '').replace(/"/g, '""')}"`;
            contenidoCSV += `${r.usuario},${r.calificacion},${comentarioSanetizado},${r.fecha_creacion}\n`;
        });

        fs.writeFileSync(rutaArchivo, contenidoCSV, 'utf8');

        return {
            mensaje: 'Archivo CSV generado exitosamente en el servidor.',
            nombreArchivo,
            rutaArchivo
        };
    }
}
