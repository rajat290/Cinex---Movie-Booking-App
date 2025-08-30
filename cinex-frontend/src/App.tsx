import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocationStore } from './stores/locationStore'
import { useAuthStore } from './stores/authStore'

// Layout Components
import Layout from './components/layout/Layout'
import LocationGate from './components/location/LocationGate'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDetail from './pages/MovieDetail'
import Theatres from './pages/Theatres'
import SeatSelection from './pages/SeatSelection'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Events from './pages/Events'
import Plays from './pages/Plays'
import Sports from './pages/Sports'
import Stream from './pages/Stream'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocationStore((state) => state.location)
  const initializeAuth = useAuthStore((state) => state.initialize)

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  // Show location gate if location is not set
  if (!location) {
    return (
      <div className="min-h-screen bg-gray-900">
        <LocationGate />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes with Layout */}
        <Route path="/" element={<Layout><Outlet /></Layout>}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          
          {/* Protected Routes */}
          <Route path="theatres/:movieId" element={
            <ProtectedRoute>
              <Theatres />
            </ProtectedRoute>
          } />
          
          <Route path="seats/:showId" element={
            <ProtectedRoute>
              <SeatSelection />
            </ProtectedRoute>
          } />
          
          <Route path="payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          
          <Route path="confirmation" element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          } />
          
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Public routes within layout */}
          <Route path="search" element={<Search />} />
          <Route path="events" element={<Events />} />
          <Route path="plays" element={<Plays />} />
          <Route path="sports" element={<Sports />} />
          <Route path="stream" element={<Stream />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App