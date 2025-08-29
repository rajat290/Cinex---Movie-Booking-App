import { useState } from 'react'
import { MapPin, Navigation, Search } from 'lucide-react'
import { useLocationStore } from '../../stores/locationStore'

const LocationGate = () => {
  const [inputValue, setInputValue] = useState('')
  const setLocation = useLocationStore(state => state.setLocation)

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Reverse geocode would go here - for now use mock
          setLocation('Mumbai')
        },
        (error) => {
          console.error('Location detection failed:', error)
        }
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setLocation(inputValue.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-primary-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to CineX
        </h2>
        <p className="text-gray-600 mb-6">
          Please select your location to continue
        </p>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your city or PIN code"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mt-4"
          >
            Confirm Location
          </button>
        </form>

        <button
          onClick={detectLocation}
          className="flex items-center justify-center w-full text-primary-600 hover:text-primary-700"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Detect my location automatically
        </button>
      </div>
    </div>
  )
}
export default LocationGate