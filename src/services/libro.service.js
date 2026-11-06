import { LibroRepository } from '../repositories/libro.repository.js';

const libroRepository = new LibroRepository();

export class LibroService {
    async listarLibros() {
        return await libroRepository.obtenerTodos();
    }

    async obtenerLibro(id) {
        const libro = await libroRepository.obtenerPorId(id);
        if (!libro) {
            throw new Error('Libro no encontrado');
        }
        return libro;
    }

    async buscarLibros(filtros) {
        const resultados = await libroRepository.busquedaAvanzada(filtros);
        return {
            total: resultados.length,
            libros: resultados
        };
    }

    async registrarLibro(datosLibro) {
        const idInsertado = await libroRepository.crear(datosLibro);
        return await libroRepository.obtenerPorId(idInsertado);
    }
}
