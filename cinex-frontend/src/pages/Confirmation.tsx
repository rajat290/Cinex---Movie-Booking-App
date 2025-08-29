import { CheckCircle, Download, QrCode, Home } from 'lucide-react'

const Confirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Your tickets have been booked successfully
        </p>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <QrCode className="w-32 h-32 mx-auto text-gray-800" />
          <div className="text-sm text-gray-600 mt-2">CINEX-123456</div>
        </div>

        {/* Booking Details */}
        <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Movie:</span>
            <span className="font-medium">Fighter</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Theatre:</span>
            <span className="font-medium">PVR Saket</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">25 Dec, 6:30 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Seats:</span>
            <span className="font-medium">D5, D6, D7</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
          <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
