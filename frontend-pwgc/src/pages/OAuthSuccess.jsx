// src/pages/OAuthSuccess.jsx
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const OAuthSuccess = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      // Décodage du payload JWT (attention, ne pas utiliser dans un environnement production sans vérification)
      const payload = JSON.parse(atob(token.split('.')[1]))
      login({ ...payload, token })
      navigate('/dashboard')
    }
  }, [])

  return <p>Connexion OAuth en cours...</p>
}

export default OAuthSuccess
