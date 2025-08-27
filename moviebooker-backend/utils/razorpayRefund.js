const razorpay = require('../config/razorpay');

const processRefund = async (paymentId, amount, reason = 'Cancellation refund') => {
  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount * 100, // Convert to paise
      notes: {
        reason: reason
      }
    });

    console.log('✅ Refund processed:', refund.id);
    return refund;
  } catch (error) {
    console.error('❌ Refund processing failed:', error);
    throw error;
  }
};

module.exports = { processRefund };