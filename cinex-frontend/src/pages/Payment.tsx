import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Payment = () => {
  const { showId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Implement actual payment logic here
      await new Promise(resolve => setTimeout(resolve, 2000)) // simulate delay
      setSuccess(true)
      setTimeout(() => {
        navigate('/confirmation')
      }, 2000)
    } catch (err) {
      setError('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl mb-6">Payment for Show ID: {showId}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-600"
      >
        {loading ? 'Processing...' : 'Confirm Payment'}
      </button>
    </div>
  )
}

export default Payment
