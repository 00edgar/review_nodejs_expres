import { ResenaService } from '../services/resena.service.js';

const resenaService = new ResenaService();

export class ResenaController {
    async obtenerPorLibro(req, res) {
        try {
            const { libroId } = req.params;
            const resenas = await resenaService.obtenerResenasPorLibro(libroId);
            return res.status(200).json({ exito: true, datos: resenas });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }

    async exportarCSV(req, res) {
        try {
            const { libroId } = req.params;
            const resultado = await resenaService.exportarResenasCSV(libroId);
            return res.status(200).json({ exito: true, datos: resultado });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
}
