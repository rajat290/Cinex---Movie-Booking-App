import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMovieTheatres } from "@/services/shows";

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

// Removed static theatre data - now using backend data

const TheatreList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movieId");
  const city = searchParams.get("city") || "Mumbai";
  const [selectedDate, setSelectedDate] = useState("Today");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theatreData, setTheatreData] = useState<any[]>([]);

  useEffect(() => {
    if (!movieId) return;
    async function fetchTheatres() {
      try {
        setLoading(true);
        setError(null);
        const dateParam = selectedDate === "Today" ? new Date() : new Date(Date.now() + 24*60*60*1000);
        const yyyyMmDd = dateParam.toISOString().slice(0,10);
        const theatres = await getMovieTheatres(movieId, { city, date: yyyyMmDd });
        setTheatreData(theatres);
      } catch (e: any) {
        setError(e?.message || "Failed to load theatres");
      } finally {
        setLoading(false);
      }
    }
    fetchTheatres();
  }, [movieId, city, selectedDate]);

  const handleShowTimeClick = (theatre: any, show: any) => {
    navigate("/seats", { 
      state: { 
        theatre: theatre.theatre.name,
        time: show.showTime,
        format: show.format,
        price: show.pricing?.[0]?.price || 0,
        showId: show.id,
        movieTitle: searchParams.get("movieTitle") || "Movie"
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
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {loading && <div className="text-sm text-muted-foreground">Loading theatres...</div>}
          {theatreData.map((theatre) => (
            <Card key={theatre.id} className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              {/* Theatre Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-2 lg:space-y-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{theatre.theatre.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {theatre.theatre.address?.area}, {theatre.theatre.address?.city}
                    </div>
                    <span>•</span>
                    <span>{theatre.distance} away</span>
                  </div>
                  
                  <div className="flex gap-1 flex-wrap">
                    {(theatre.theatre.amenities || []).map((amenity: string) => (
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
                  {theatre.shows.map((show: any, index: number) => (
                    <Button
                      key={index}
                      variant="cinema"
                      className={`
                        h-auto p-3 flex flex-col items-start space-y-1 
                        hover:scale-105 transition-transform
                      `}
                      onClick={() => handleShowTimeClick(theatre, show)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold">{show.showTime}</span>
                        <Badge variant="outline" className="text-xs">
                          {show.format}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between w-full text-xs" />
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