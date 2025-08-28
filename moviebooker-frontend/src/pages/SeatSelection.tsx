import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ArrowLeft, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { getSeats, SeatDTO } from "@/services/seats";
import { createBooking } from "@/services/bookings";
import { useToast } from "@/hooks/use-toast";

interface LocationState {
  theatre: string;
  time: string;
  format: string;
  price: number;
  showId: string;
  movieTitle: string;
}

const SeatSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const state = location.state as LocationState;
  const showId = searchParams.get("showId") || state?.showId;
  
  if (!state || !showId) {
    navigate("/");
    return null;
  }

  const [seats, setSeats] = useState<SeatDTO[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        setError(null);
        const seatsData = await getSeats(showId);
        setSeats(seatsData.seats);
      } catch (e: any) {
        setError(e?.message || "Failed to load seats");
        toast({
          title: "Error",
          description: "Failed to load seat availability",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showId, toast]);

  const handleSeatClick = (seatNumber: string) => {
    const seat = seats.find(s => s.seatNumber === seatNumber);
    if (!seat || seat.status !== 'available') return;

    if (selectedSeats.includes(seatNumber)) {
      // Deselect seat
      setSelectedSeats(prev => prev.filter(id => id !== seatNumber));
    } else {
      // Select seat
      setSelectedSeats(prev => [...prev, seatNumber]);
    }
  };

  const getSeatColor = (seat: SeatDTO, isSelected: boolean) => {
    if (isSelected) return "bg-seat-selected";
    switch (seat.status) {
      case "available": return "bg-seat-available hover:bg-seat-available/80";
      case "booked": return "bg-seat-unavailable cursor-not-allowed";
      case "blocked": return "bg-seat-unavailable cursor-not-allowed";
      default: return "bg-seat-available hover:bg-seat-available/80";
    }
  };

  const selectedSeatDetails = selectedSeats.map(seatNumber => {
    const seat = seats.find(s => s.seatNumber === seatNumber);
    return {
      seatNumber,
      seatType: seat?.seatType || 'regular',
      price: seat?.price || state.price
    };
  });

  const totalPrice = selectedSeatDetails.reduce((sum, seat) => sum + seat.price, 0);
  const convenienceFee = selectedSeats.length * 25;
  const finalTotal = totalPrice + convenienceFee;

  const handleProceedToPay = async () => {
    if (selectedSeats.length === 0) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to continue with booking",
        variant: "destructive",
      });
      navigate("/login", { state: { from: location.pathname + location.search } });
      return;
    }

    try {
      setBookingLoading(true);
      
      // Create booking
      const bookingData = {
        showId,
        seats: selectedSeatDetails
      };
      
      const bookingResponse = await createBooking(bookingData);
      
      // Navigate to payment with booking details
      navigate("/payment", {
        state: {
          ...state,
          selectedSeats,
          totalPrice: finalTotal,
          seatCount: selectedSeats.length,
          bookingId: bookingResponse.booking._id,
          booking: bookingResponse.booking
        }
      });
      
    } catch (e: any) {
      toast({
        title: "Booking Failed",
        description: e?.message || "Failed to create booking",
        variant: "destructive",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    const row = seat.seatNumber.charAt(0);
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, SeatDTO[]>);

  const rows = Object.keys(seatsByRow).sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading seats...</p>
        </div>
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
            {state.theatre}
          </Button>
          <p className="text-sm text-muted-foreground mt-1">
            {state.time} • {state.format}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-card">
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              
              {/* Screen */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">SCREEN</span>
                </div>
                <div className="h-2 bg-gradient-accent rounded-full w-3/4 mx-auto shadow-glow"></div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mb-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-seat-available rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-seat-selected rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-seat-unavailable rounded"></div>
                  <span>Sold</span>
                </div>
              </div>

              {/* Seats */}
              <div className="space-y-3">
                {rows.map(row => (
                  <div key={row} className="flex items-center justify-center gap-2">
                    {/* Row Label */}
                    <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                      {row}
                    </span>
                    
                    {/* Seats */}
                    <div className="flex gap-1">
                      {seatsByRow[row]
                        .sort((a, b) => parseInt(a.seatNumber.slice(1)) - parseInt(b.seatNumber.slice(1)))
                        .map(seat => (
                          <Button
                            key={seat.seatNumber}
                            size="sm"
                            className={`
                              w-8 h-8 p-0 text-xs font-medium rounded border-0
                              ${getSeatColor(seat, selectedSeats.includes(seat.seatNumber))}
                              transition-all duration-200 transform hover:scale-110
                            `}
                            onClick={() => handleSeatClick(seat.seatNumber)}
                            disabled={seat.status !== 'available'}
                          >
                            {seat.seatNumber.slice(1)}
                          </Button>
                        ))}
                    </div>
                    
                    {/* Row Label Right */}
                    <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                      {row}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gradient-card sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Movie</p>
                  <p className="font-medium">{state.movieTitle}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Theatre</p>
                    <p className="font-medium">{state.theatre}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Show Time</p>
                    <p className="font-medium">{state.time}</p>
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Selected Seats</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats.map(seatId => (
                        <Badge key={seatId} variant="secondary">
                          {seatId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedSeats.length > 0 && (
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Tickets ({selectedSeats.length})</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-border pt-3">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              )}

              <Button
                variant="hero"
                size="lg"
                className="w-full mt-6"
                onClick={handleProceedToPay}
                disabled={selectedSeats.length === 0 || bookingLoading}
              >
                {bookingLoading 
                  ? "Creating Booking..." 
                  : selectedSeats.length === 0 
                    ? "Select Seats to Continue" 
                    : `Proceed to Pay ₹${finalTotal}`
                }
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;