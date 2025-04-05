// /routes/mfaRoutes.js
import express from 'express'
import passport from 'passport'
import { generateMfaSecret, verifyMfaCode } from '../controllers/mfaController.js'
const router = express.Router()

// Pour générer le secret (requiert que l’utilisateur soit authentifié)
router.get('/generate', passport.authenticate('jwt', { session: false }), generateMfaSecret)

// Pour vérifier le code MFA
router.post('/verify', passport.authenticate('jwt', { session: false }), verifyMfaCode)

export default router
