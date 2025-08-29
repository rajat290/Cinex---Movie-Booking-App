import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Calendar, Clock, Star, Users, Play } from 'lucide-react'
import { movieService } from '../services/movieService'

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchMovie()
  }, [id])

  const fetchMovie = async () => {
    try {
      const data = await movieService.getMovie(id!)
      setMovie(data)
    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  }

  if (!movie) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image */}
      <div 
        className="h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-40 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex items-center gap-6 text-gray-300 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(movie.releaseDate).getFullYear()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                {movie.imdbRating}/10
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button className="bg-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-700">
                Book Tickets
              </button>
              <button className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800">
                <Play className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <div className="flex gap-8">
                {['overview', 'cast', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-1 capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-primary-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div>
                <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="text-gray-400 mb-2">Genre</h4>
                    <p>{movie.genre.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 mb-2">Languages</h4>
                    <p>{movie.language.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* More tabs content... */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MovieDetail