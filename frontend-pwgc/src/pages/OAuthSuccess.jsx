import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const OAuthSuccess = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => {
    const token = params.get('token')
    console.log('Token reçu depuis l’URL :', token)

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        console.log('Payload JWT :', payload)
        login({ ...payload, token })
        navigate('/dashboard')
      } catch (error) {
        console.error('Erreur token :', error)
        navigate('/login')
      }
    }
  }, [login, navigate, params])

  return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Connexion OAuth en cours...</h2>
}

export default OAuthSuccess
