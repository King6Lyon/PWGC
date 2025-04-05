// /controllers/mfaController.js
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'

// Générer un secret MFA et retourner le QR code
export const generateMfaSecret = async (req, res) => {
  // On peut associer ce secret à l'utilisateur (ex. en l'enregistrant dans la BDD)
  const secret = speakeasy.generateSecret({ name: `PWGC (${req.user.email})` })
  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la génération du QR code' })
    res.json({ secret: secret.base32, qr: data_url })
  })
}

// Vérifier le code MFA fourni
export const verifyMfaCode = async (req, res) => {
  const { token, secret } = req.body
  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1
  })
  if (verified) {
    res.json({ message: 'MFA vérifiée' })
  } else {
    res.status(400).json({ message: 'Code MFA invalide' })
  }
}
