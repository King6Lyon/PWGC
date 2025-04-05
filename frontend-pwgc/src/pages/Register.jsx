// src/pages/Register.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    mfaCode: '', // à activer plus tard
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'inscription")
    }
  }

  const handleOAuth = (provider) => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mfaCode"
          placeholder="Code MFA (si activé)"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          S’inscrire
        </button>
      </form>

      <div className="mt-6">
        <p className="text-center text-gray-500">Ou s’inscrire avec</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleOAuth('google')}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Google
          </button>
          <button
            onClick={() => handleOAuth('microsoft')}
            className="bg-blue-700 text-white px-4 py-2 rounded"
          >
            Microsoft
          </button>
          <button
            onClick={() => handleOAuth('linkedin')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            LinkedIn
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
