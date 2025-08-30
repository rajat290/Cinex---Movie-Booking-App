import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import { showService } from '../services/showService'
import { useLocationStore } from '../stores/locationStore'

interface Theatre {
  _id: string
  name: string
  address: {
    area: string
    city: string
  }
  shows: Show[]
}

interface Show {
  _id: string
  showTime: string
  format: string
  pricing: Array<{ price: number }>
}

const Theatres = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const location = useLocationStore(state => state.location)
  const [theatres, setTheatres] = useState<Theatre[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    fetchTheatres()
  }, [movieId, selectedDate, location])

  const fetchTheatres = async () => {
    try {
      console.log('Fetching theatres for movie:', movieId, 'city:', location, 'date:', selectedDate.toISOString().split('T')[0])
      const data = await showService.getTheatresForMovie(movieId!, {
        date: selectedDate.toISOString().split('T')[0],
        city: location
      })
      console.log('API response:', data)
      setTheatres(data.theatres)
    } catch (error) {
      console.error('Error fetching theatres:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Select Theatre</h1>

        {/* Date Selector */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Select Date</h3>
          <div className="flex gap-2 overflow-x-auto">
            {[...Array(7)].map((_, i) => {
              const date = new Date()
              date.setDate(date.getDate() + i)
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg min-w-20 ${
                    date.toDateString() === selectedDate.toDateString()
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="text-sm">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                  <div className="font-semibold">{date.getDate()}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Theatres List */}
        <div className="space-y-4">
          {theatres.map((theatre) => (
            <div key={theatre._id} className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold text-lg mb-2">{theatre.name}</h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {theatre.address.area}, {theatre.address.city}
              </div>

              {/* Show Times */}
              <div className="border-t pt-3">
                <h4 className="font-medium mb-2">Show Times</h4>
                <div className="flex flex-wrap gap-2">
                  {theatre.shows.map((show) => (
                    <button
                      key={show._id}
                      onClick={() => {
                        // Navigate to seat selection
                        navigate(`/seats/${show._id}`)
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-primary-100 hover:text-primary-600"
                    >
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{show.showTime}</span>
                      <span className="text-sm text-gray-500">{show.format}</span>
                      <span className="ml-2 font-semibold">₹{show.pricing[0].price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Theatres
