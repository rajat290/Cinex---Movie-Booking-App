import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Calendar, Clock, Star, Play } from 'lucide-react'
import { movieService, type Movie } from '../services/movieService'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchMovie()
  }, [id])

  const fetchMovie = async () => {
    try {
      if (id) {
        const data = await movieService.getMovie(id)
        setMovie(data)
      }
    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  }

  if (!movie) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image */}
      <div 
