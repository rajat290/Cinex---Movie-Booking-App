import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useLocationStore } from '../../stores/locationStore'
import LocationGate from '../location/LocationGate'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const location = useLocationStore(state => state.location)
  const [showLocationGate, setShowLocationGate] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-primary-500">
          CineX
        </Link>

        <nav className="flex items-center space-x-4">
          <button
            onClick={() => setShowLocationGate(true)}
            className="flex items-center space-x-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded"
            aria-label="Select Location"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-4.418 0-8-3.582-8-8 0-3.866 3.134-7 7-7s7 3.134 7 7c0 4.418-3.582 8-8 8z"
              />
            </svg>
            <span>{location || 'Select Location'}</span>
          </button>

          {isAuthenticated && user ? (
            <>
              <span>Welcome, {user.firstName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {showLocationGate && <LocationGate />}
    </header>
  )
}

export default Header
