// src/router/AppRouter.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Pages
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

  // Fonction pour protéger les routes standards
  const protectedRoute = (component) => (user ? component : <Navigate to="/login" />)

  // Fonction pour protéger les routes admin
  const adminRoute = (component) => (user?.role === 'admin' ? component : <Navigate to="/" />)

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/oauth-success', element: <OAuthSuccess /> },

    // Routes protégées
    { path: '/mfa-setup', element: protectedRoute(<MfaSetup />) },
    { path: '/profile', element: protectedRoute(<Profile />) },
    { path: '/dashboard', element: protectedRoute(<Dashboard />) },
    { path: '/admin', element: adminRoute(<AdminDashboard />) },

    // 404
    { path: '*', element: <NotFound /> }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
