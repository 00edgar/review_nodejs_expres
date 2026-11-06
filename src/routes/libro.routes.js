import { Router } from 'express';
import { LibroController } from '../controllers/libro.controller.js';

const router = Router();
const libroController = new LibroController();

router.get('/', (req, res) => libroController.obtenerTodos(req, res));
router.get('/buscar', (req, res) => libroController.buscar(req, res));
router.get('/:id', (req, res) => libroController.obtenerPorId(req, res));
router.post('/', (req, res) => libroController.crear(req, res));

export default router;
