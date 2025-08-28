import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { createOrder, verifyPayment } from "@/services/payments";
import { useToast } from "@/hooks/use-toast";

interface LocationState {
  theatre: string;
  time: string;
  format: string;
  price: number;
  selectedSeats: string[];
  totalPrice: number;
  seatCount: number;
  bookingId: string;
  booking: any;
  movieTitle: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const state = location.state as LocationState;
  
  if (!state || !state.bookingId) {
    navigate("/");
    return null;
  }

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Create Razorpay order
      const orderResponse = await createOrder({
        bookingId: state.bookingId,
        paymentMethod: 'upi'
      });
      
      setOrderDetails(orderResponse);

      // Initialize Razorpay
      const options = {
        key: orderResponse.key,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'CineX',
        description: `Booking for ${state.movieTitle}`,
        order_id: orderResponse.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });
            
            setPaymentSuccess(true);
            toast({
              title: "Payment Successful!",
              description: "Your booking has been confirmed",
            });
            
            // Redirect to booking confirmation after 3 seconds
            setTimeout(() => {
              navigate("/tickets");
            }, 3000);
            
          } catch (error: any) {
            toast({
              title: "Payment Verification Failed",
              description: error?.message || "Failed to verify payment",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error?.message || "Failed to initiate payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-4">
            Your booking has been confirmed. You will receive a confirmation email shortly.
          </p>
          <Button onClick={() => navigate("/tickets")}>
            View My Bookings
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Seats
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Payment Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
            <p className="text-muted-foreground">
              Secure payment powered by Razorpay
            </p>
          </div>

          {/* Booking Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Movie</p>
                  <p className="font-medium">{state.movieTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Theatre</p>
                  <p className="font-medium">{state.theatre}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Show Time</p>
                  <p className="font-medium">{state.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Format</p>
                  <p className="font-medium">{state.format}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Selected Seats</p>
                <div className="flex flex-wrap gap-1">
                  {state.selectedSeats.map(seatId => (
                    <Badge key={seatId} variant="secondary">
                      {seatId}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Tickets ({state.seatCount})</span>
                <span>₹{state.totalPrice - (state.seatCount * 25)}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹{state.seatCount * 25}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-border pt-3">
                <span>Total Amount</span>
                <span>₹{state.totalPrice}</span>
              </div>
            </div>
          </Card>

          {/* Security Notice */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-blue-700">
                  Your payment is secured by Razorpay. We use industry-standard encryption to protect your data.
                </p>
              </div>
            </div>
          </Card>

          {/* Payment Button */}
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay ₹{state.totalPrice}
              </>
            )}
          </Button>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center">
            By proceeding, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
