import { useEffect, useState } from 'react'
import { useLocationStore } from '../stores/locationStore'
import { movieService } from '../services/movieService'
import Header from '../components/layout/Header'
import HeroCarousel from '../components/home/HeroCarousel'
import MovieSection from '../components/home/MovieSection'
import CategoryNav from '../components/home/CategoryNav'
import LocationGate from '../components/location/LocationGate'

const Home = () => {
  const location = useLocationStore(state => state.location)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (location) {
      fetchMovies()
    }
  }, [location])

  const fetchMovies = async () => {
    try {
      const data = await movieService.getMovies({ city: location })
      setMovies(data.movies)
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!location) {
    return <LocationGate />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main>
        <HeroCarousel movies={movies.slice(0, 5)} />
        
        <div className="container mx-auto px-4 py-8">
          <CategoryNav />
          
          <MovieSection 
            title="Recommended Movies"
            movies={movies.filter(m => m.status === 'running')}
          />
          
          <MovieSection
            title="Coming Soon"
            movies={movies.filter(m => m.status === 'upcoming')}
          />

          <MovieSection
            title="Trending Events"
            movies={movies.filter(m => m.genre.includes('Action'))}
          />
        </div>
      </main>
    </div>
  )
}
export default Home