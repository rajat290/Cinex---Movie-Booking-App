import { useState } from 'react'
import { Search, MapPin, User } from 'lucide-react'
import { useLocationStore } from '../../stores/locationStore'
import { useAuthStore } from '../../stores/authStore'

const Header = () => {
  const [showSearch, setShowSearch] = useState(false)
  const location = useLocationStore(state => state.location)
  const { user } = useAuthStore()

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary-500">CineX</h1>
            
            {/* Location */}
            <div className="flex items-center gap-1 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            {showSearch ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for movies, events, plays..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="w-full flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-gray-400 hover:text-white"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search</span>
              </button>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-300 hidden sm:block">
                  {user.firstName}
                </span>
              </div>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 text-primary-400 hover:text-primary-300 text-sm"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header