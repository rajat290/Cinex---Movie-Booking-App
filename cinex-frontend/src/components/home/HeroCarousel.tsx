import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

interface HeroCarouselProps {
  movies: any[]
}

const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [movies.length])

  if (movies.length === 0) return null

  return (
    <div className="relative h-80 md:h-96 overflow-hidden">
      {movies.map((movie, index) => (
        <div
          key={movie._id}
          className={`absolute inset-0 transition-transform duration-500 ${
            index === currentSlide ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-300 mb-4 line-clamp-2">{movie.description}</p>
              <div className="flex gap-4">
                <button className="bg-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-primary-700">
                  Book Now
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-800">
                  <Play className="w-4 h-4" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % movies.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-primary-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel