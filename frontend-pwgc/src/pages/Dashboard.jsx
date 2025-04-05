// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react'
import API from '../services/api'

const Dashboard = () => {
  const [progress, setProgress] = useState(0)
  const [tasks, setTasks] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Récupère les statistiques, tâches, alertes du backend
    API.get('/dashboard/stats')
      .then((res) => {
        setProgress(res.data.conformityScore)
        setTasks(res.data.tasks)
        setAlerts(res.data.alerts)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-6">Dashboard</h2>
      <div className="mb-6">
        <p>Score de Conformité : {progress}%</p>
        <div className="w-full bg-gray-300 h-4 rounded">
          <div
            style={{ width: `${progress}%` }}
            className="bg-blue-600 h-4 rounded transition-all duration-500"
          ></div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl">Tâches à Compléter</h3>
        <ul className="list-disc pl-6">
          {tasks.map((task, index) => (
            <li key={index}>{task.description}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl">Alertes</h3>
        {alerts.map((alert, index) => (
          <p key={index} className="text-red-600">
            {alert}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
