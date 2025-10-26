import express from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/taskControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(verifyToken);

router.get('/',getAllTasks);
router.post('/',createTask);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);

export default router;