import { Router } from 'express';
import { ResenaController } from '../controllers/resena.controller.js';

const router = Router();
const resenaController = new ResenaController();

router.get('/libro/:libroId', (req, res) => resenaController.obtenerPorLibro(req, res));
router.get('/exportar/:libroId', (req, res) => resenaController.exportarCSV(req, res));

export default router;
