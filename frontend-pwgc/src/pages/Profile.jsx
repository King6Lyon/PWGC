// src/pages/Profile.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import API from '../services/api'

const Profile = () => {
  const { user, login } = useAuth()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [message, setMessage] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await API.put('/user/profile', { name, email })
      // Met à jour le contexte si besoin
      login({ ...user, name: res.data.name, email: res.data.email })
      setMessage('Profil mis à jour')
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage('Erreur lors de la mise à jour')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Mon Profil</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Mettre à jour
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}

export default Profile
