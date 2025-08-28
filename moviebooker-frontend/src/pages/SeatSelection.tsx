import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SeatProps {
  id: string;
  row: string;
  number: number;
  status: "available" | "selected" | "unavailable";
}

interface LocationState {
  theatre: string;
  time: string;
  format: string;
  price: number;
}

const SeatSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  if (!state) {
    navigate("/");
    return null;
  }

  // Generate seat map
  const generateSeats = (): SeatProps[] => {
    const seats: SeatProps[] = [];
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const seatsPerRow = 14;
    
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        // Random unavailable seats for demo
        const isUnavailable = Math.random() < 0.2;
        
        seats.push({
          id: seatId,
          row,
          number: i,
          status: isUnavailable ? "unavailable" : "available"
        });
      }
    });
    
    return seats;
  };

  const [seats, setSeats] = useState<SeatProps[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === "unavailable") return;

    if (selectedSeats.includes(seatId)) {
      // Deselect seat
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
      setSeats(prev => prev.map(s => 
        s.id === seatId ? { ...s, status: "available" } : s
      ));
    } else {
      // Select seat
      setSelectedSeats(prev => [...prev, seatId]);
      setSeats(prev => prev.map(s => 
        s.id === seatId ? { ...s, status: "selected" } : s
      ));
    }
  };

  const getSeatColor = (status: SeatProps["status"]) => {
    switch (status) {
      case "available": return "bg-seat-available hover:bg-seat-available/80";
      case "selected": return "bg-seat-selected";
      case "unavailable": return "bg-seat-unavailable cursor-not-allowed";
    }
  };

  const totalPrice = selectedSeats.length * state.price;
  const convenienceFee = selectedSeats.length * 25;
  const finalTotal = totalPrice + convenienceFee;

  const handleProceedToPay = () => {
    if (selectedSeats.length === 0) return;
    
    navigate("/payment", {
      state: {
        ...state,
        selectedSeats,
        totalPrice: finalTotal,
        seatCount: selectedSeats.length
      }
    });
  };

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
                {["A", "B", "C", "D", "E", "F", "G", "H"].map(row => (
                  <div key={row} className="flex items-center justify-center gap-2">
                    {/* Row Label */}
                    <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                      {row}
                    </span>
                    
                    {/* Seats */}
                    <div className="flex gap-1">
                      {seats
                        .filter(seat => seat.row === row)
                        .map(seat => (
                          <Button
                            key={seat.id}
                            size="sm"
                            className={`
                              w-8 h-8 p-0 text-xs font-medium rounded border-0
                              ${getSeatColor(seat.status)}
                              transition-all duration-200 transform hover:scale-110
                            `}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={seat.status === "unavailable"}
                          >
                            {seat.number}
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
                  <p className="font-medium">Interstellar Odyssey</p>
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
                disabled={selectedSeats.length === 0}
              >
                {selectedSeats.length === 0 
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