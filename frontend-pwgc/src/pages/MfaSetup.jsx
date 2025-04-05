// src/pages/MfaSetup.jsx
import { useState, useEffect } from 'react'
import API from '../services/api'

const MfaSetup = () => {
  const [qrData, setQrData] = useState(null)
  const [secret, setSecret] = useState(null)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Génération du secret et du QR code via le backend
    API.get('/mfa/generate')
      .then((res) => {
        setQrData(res.data.qr)
        setSecret(res.data.secret)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleVerify = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/mfa/verify', { token: code, secret })
      setMessage(res.data.message)
    } catch (err) {
      setMessage(err.response.data.message || 'Erreur de vérification')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Configurer la MFA</h2>
      {qrData && <img src={qrData} alt="QR Code MFA" className="mb-4" />}
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Entrez le code MFA"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Vérifier
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}

export default MfaSetup
