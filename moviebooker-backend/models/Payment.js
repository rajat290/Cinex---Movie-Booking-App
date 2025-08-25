const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentMethod: { 
    type: String, 
    enum: ['upi', 'card', 'netbanking', 'wallet', 'paylater'], 
    required: true 
  },
  paymentGateway: { type: String, default: 'razorpay' },
  orderId: { type: String, required: true }, // Razorpay order ID
  paymentId: { type: String }, // Razorpay payment ID
  bank: { type: String }, // For netbanking
  wallet: { type: String }, // For wallet payments
  upiId: { type: String }, // For UPI payments
  cardId: { type: String }, // For card payments
  status: { 
    type: String, 
    enum: ['created', 'attempted', 'paid', 'failed', 'refunded'], 
    default: 'created' 
  },
  refundDetails: {
    refundId: { type: String },
    refundAmount: { type: Number },
    refundDate: { type: Date },
    reason: { type: String }
  },
  gatewayResponse: { type: mongoose.Schema.Types.Mixed } // Raw response from Razorpay
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);