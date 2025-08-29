import { Star, Clock } from 'lucide-react'

interface MovieCardProps {
  movie: any
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded">
          <span className="text-white text-xs">{movie.rating}</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-white mb-1 line-clamp-1">{movie.title}</h3>
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400" />
            {movie.imdbRating}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard