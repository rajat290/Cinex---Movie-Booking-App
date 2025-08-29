import { useEffect, useState } from 'react'
import { movieService } from '../services/movieService'
import MovieSection from '../components/movie/MovieSection'
import HeroCarousel from '../components/HeroCarousel'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const data = await movieService.getMovies({ city: 'Delhi' })
      setMovies(data.movies)
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <HeroCarousel />
      
      <MovieSection 
        title="Now Showing"
        movies={movies.filter(m => m.status === 'running')}
      />
      
      <MovieSection
        title="Coming Soon"
        movies={movies.filter(m => m.status === 'upcoming')}
      />
    </div>
  )
}