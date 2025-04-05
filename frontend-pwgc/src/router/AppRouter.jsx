// src/router/AppRouter.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import OAuthSuccess from '../pages/OAuthSuccess'
import MfaSetup from '../pages/MfaSetup'
import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'
import AdminDashboard from '../pages/AdminDashboard'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  const { user } = useAuth()

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/oauth-success', element: <OAuthSuccess /> },
    // Route pour configurer la MFA (accessible aux utilisateurs connectés)
    { path: '/mfa-setup', element: user ? <MfaSetup /> : <Navigate to="/login" /> },
    // Profil utilisateur
    { path: '/profile', element: user ? <Profile /> : <Navigate to="/login" /> },
    // Dashboard (différent selon rôle)
    {
      path: '/dashboard',
      element: user ? <Dashboard /> : <Navigate to="/login" />
    },
    {
      path: '/admin',
      element: user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
    },
    { path: '*', element: <NotFound /> }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
