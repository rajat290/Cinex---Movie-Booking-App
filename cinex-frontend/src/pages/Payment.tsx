import { useState } from 'react'
import { CreditCard, Smartphone, Building, Wallet } from 'lucide-react'

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('upi')

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: Smartphone, description: 'Pay using UPI apps' },
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Pay using card' },
    { id: 'netbanking', label: 'Net Banking', icon: Building, description: 'Internet banking' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, description: 'Paytm, PhonePe, etc.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-8">Complete Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Movie</span>
                <span className="font-medium">Fighter</span>
              </div>
              <div className="flex justify-between">
                <span>Theatre</span>
                <span className="font-medium">PVR Saket</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time</span>
                <span className="font-medium">25 Dec, 6:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Seats</span>
                <span className="font-medium">D5, D6, D7</span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹750</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹75</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹825</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 border rounded-lg text-left transition-colors ${
                    selectedMethod === method.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <method.icon className="w-6 h-6 text-gray-600" />
                    <div>
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Payment Form */}
            {selectedMethod === 'upi' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">
                  Pay ₹825
                </button>
              </div>
            )}

            {/* Other payment methods forms... */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Payment