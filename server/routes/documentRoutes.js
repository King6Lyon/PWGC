import express from 'express';
import passport from 'passport';
import { addDocument, getAllDocuments, deleteDocument } from '../controllers/documentController.js';

const router = express.Router();

// Ajouter un document
router.post('/add', passport.authenticate('jwt', { session: false }), addDocument);

// Obtenir tous les documents
router.get('/', passport.authenticate('jwt', { session: false }), getAllDocuments);

// Supprimer un document
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteDocument);

export default router;
