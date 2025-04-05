// /routes/authRoutes.js
import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { register, login } from '../controllers/authController.js'
const router = express.Router()

// Routes classiques
router.post('/register', register)
router.post('/login', login)

// ----- Google OAuth -----
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`)
  }
)

// ----- Microsoft OAuth -----
router.get('/microsoft', passport.authenticate('microsoft', { scope: ['user.read'] }))

router.get(
  '/microsoft/callback',
  passport.authenticate('microsoft', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`)
  }
)

// ----- LinkedIn OAuth -----
router.get('/linkedin', passport.authenticate('linkedin'))

router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`)
  }
)

export default router
