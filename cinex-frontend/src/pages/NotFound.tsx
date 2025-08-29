import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you are looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
