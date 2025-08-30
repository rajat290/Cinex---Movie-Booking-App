import { ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'

interface MovieSectionProps {
  title: string
  movies: any[]
  viewAllLink?: string
}

const MovieSection = ({ title, movies, viewAllLink }: MovieSectionProps) => {
  if (movies.length === 0) return null

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink}
            className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieSection