// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import API from '../services/api'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    API.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-6">Dashboard Administrateur</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard
