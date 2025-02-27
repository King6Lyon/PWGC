import express from 'express';
import { getAllCompliances, addCompliance, updateCompliance, deleteCompliance } from '../controllers/complianceController.js';

const router = express.Router();

router.get('/', getAllCompliances);
router.post('/', addCompliance);
router.put('/:id', updateCompliance);
router.delete('/:id', deleteCompliance);

export default router;
