import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ShowTime {
  time: string;
  format: string;
  price: number;
  available: "Available" | "Filling Fast" | "Sold Out";
}

interface Theatre {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance: string;
  amenities: string[];
  showTimes: ShowTime[];
}

const theatreData: Theatre[] = [
  {
    id: "1",
    name: "INOX Mega Mall",
    location: "R City Mall, Ghatkopar West",
    rating: 4.2,
    distance: "2.5 km",
    amenities: ["Parking", "Food Court", "M-Ticket"],
    showTimes: [
      { time: "09:30 AM", format: "2D", price: 180, available: "Available" },
      { time: "01:15 PM", format: "3D", price: 250, available: "Filling Fast" },
      { time: "05:00 PM", format: "2D", price: 200, available: "Available" },
      { time: "09:30 PM", format: "IMAX", price: 350, available: "Available" },
    ]
  },
  {
    id: "2", 
    name: "PVR Phoenix Mills",
    location: "Phoenix Mills, Lower Parel",
    rating: 4.5,
    distance: "4.2 km",
    amenities: ["Parking", "Food Court", "Recliner"],
    showTimes: [
      { time: "10:00 AM", format: "2D", price: 220, available: "Available" },
      { time: "02:00 PM", format: "3D", price: 280, available: "Available" },
      { time: "06:15 PM", format: "2D", price: 240, available: "Filling Fast" },
      { time: "10:30 PM", format: "3D", price: 300, available: "Available" },
    ]
  },
  {
    id: "3",
    name: "Cinépolis Fun Cinemas",
    location: "Andheri West",
    rating: 4.1,
    distance: "6.1 km", 
    amenities: ["Parking", "Food Court"],
    showTimes: [
      { time: "11:30 AM", format: "2D", price: 160, available: "Available" },
      { time: "03:45 PM", format: "2D", price: 180, available: "Available" },
      { time: "07:30 PM", format: "3D", price: 230, available: "Sold Out" },
      { time: "11:15 PM", format: "2D", price: 200, available: "Available" },
    ]
  }
];

const TheatreList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("Today");

  const handleShowTimeClick = (theatre: Theatre, showTime: ShowTime) => {
    if (showTime.available === "Sold Out") return;
    
    navigate("/seats", { 
      state: { 
        theatre: theatre.name,
        time: showTime.time,
        format: showTime.format,
        price: showTime.price
      }
    });
  };

  const getAvailabilityColor = (status: ShowTime["available"]) => {
    switch (status) {
      case "Available": return "text-green-500";
      case "Filling Fast": return "text-yellow-500";
      case "Sold Out": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/movie/interstellar")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Interstellar Odyssey
          </Button>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Date Selection */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["Today", "Tomorrow", "Dec 17", "Dec 18"].map((date) => (
            <Button
              key={date}
              variant={selectedDate === date ? "default" : "outline"}
              onClick={() => setSelectedDate(date)}
              className="whitespace-nowrap"
            >
              {date}
            </Button>
          ))}
        </div>

        {/* Theatre List */}
        <div className="space-y-4">
          {theatreData.map((theatre) => (
            <Card key={theatre.id} className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              {/* Theatre Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-2 lg:space-y-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{theatre.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold mr-1" />
                      {theatre.rating}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {theatre.location}
                    </div>
                    <span>•</span>
                    <span>{theatre.distance} away</span>
                  </div>
                  
                  <div className="flex gap-1 flex-wrap">
                    {theatre.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Show Times */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Show Times</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {theatre.showTimes.map((showTime, index) => (
                    <Button
                      key={index}
                      variant={showTime.available === "Sold Out" ? "secondary" : "cinema"}
                      className={`
                        h-auto p-3 flex flex-col items-start space-y-1 
                        ${showTime.available === "Sold Out" 
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:scale-105 transition-transform"
                        }
                      `}
                      onClick={() => handleShowTimeClick(theatre, showTime)}
                      disabled={showTime.available === "Sold Out"}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold">{showTime.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {showTime.format}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between w-full text-xs">
                        <span>₹{showTime.price}</span>
                        <span className={getAvailabilityColor(showTime.available)}>
                          {showTime.available}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheatreList;