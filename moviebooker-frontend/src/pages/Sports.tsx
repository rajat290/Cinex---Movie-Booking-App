import React, { useState } from "react";
import { Trophy, Calendar, MapPin, Clock, Users, Star, Zap } from "lucide-react";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sportsEvents = [
  {
    id: "sport-1",
    title: "Mumbai Indians vs Chennai Super Kings",
    description: "IPL 2024 - The ultimate cricket showdown",
    image: "/placeholder.svg",
    date: "2024-09-25",
    time: "7:30 PM",
    venue: "Wankhede Stadium",
    location: "Churchgate, Mumbai",
    price: "₹800",
    rating: 4.9,
    sport: "Cricket",
    league: "IPL",
    teams: ["Mumbai Indians", "Chennai Super Kings"],
    capacity: "33,000",
    status: "selling-fast"
  },
  {
    id: "sport-2",
    title: "FC Goa vs Mumbai City FC",
    description: "Indian Super League football match",
    image: "/placeholder.svg",
    date: "2024-09-28",
    time: "6:00 PM",
    venue: "Mumbai Football Arena",
    location: "Andheri East, Mumbai",
    price: "₹300",
    rating: 4.6,
    sport: "Football",
    league: "ISL",
    teams: ["FC Goa", "Mumbai City FC"],
    capacity: "15,000",
    status: "available"
  },
  {
    id: "sport-3",
    title: "Pro Kabaddi League",
    description: "U Mumba vs Bengaluru Bulls",
    image: "/placeholder.svg",
    date: "2024-10-02",
    time: "8:00 PM",
    venue: "NSCI Dome",
    location: "Worli, Mumbai",
    price: "₹250",
    rating: 4.4,
    sport: "Kabaddi",
    league: "PKL",
    teams: ["U Mumba", "Bengaluru Bulls"],
    capacity: "8,000",
    status: "available"
  },
  {
    id: "sport-4",
    title: "ATP Tennis Championship",
    description: "Maharashtra Open Quarter Finals",
    image: "/placeholder.svg",
    date: "2024-10-05",
    time: "4:00 PM",
    venue: "Balewadi Stadium",
    location: "Pune, Maharashtra",
    price: "₹1200",
    rating: 4.8,
    sport: "Tennis",
    league: "ATP",
    teams: ["Singles Tournament"],
    capacity: "5,500",
    status: "limited"
  },
  {
    id: "sport-5",
    title: "Boxing Championship",
    description: "Professional Boxing League Finals",
    image: "/placeholder.svg",
    date: "2024-10-10",
    time: "7:00 PM",
    venue: "Sardar Vallabhbhai Patel Stadium",
    location: "Mumbai",
    price: "₹600",
    rating: 4.5,
    sport: "Boxing",
    league: "PBL",
    teams: ["Championship Fight"],
    capacity: "12,000",
    status: "available"
  }
];

const sports = ["All", "Cricket", "Football", "Kabaddi", "Tennis", "Boxing", "Badminton", "Basketball"];
const leagues = ["All", "IPL", "ISL", "PKL", "ATP", "PBL"];

const Sports = () => {
  const [currentLocation, setCurrentLocation] = useState("Mumbai");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedLeague, setSelectedLeague] = useState("All");

  const handleLocationClick = () => {
    const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const filteredEvents = sportsEvents.filter(event => {
    const sportMatch = selectedSport === "All" || event.sport === selectedSport;
    const leagueMatch = selectedLeague === "All" || event.league === selectedLeague;
    
    return sportMatch && leagueMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'selling-fast':
        return <Badge className="bg-red-600 text-white">Selling Fast</Badge>;
      case 'limited':
        return <Badge className="bg-yellow-600 text-white">Limited Seats</Badge>;
      case 'available':
        return <Badge className="bg-green-600 text-white">Available</Badge>;
      default:
        return null;
    }
  };

  const SportCard = ({ event }: { event: typeof sportsEvents[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-red-500/20 relative">
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-orange-600 text-white">
            {event.sport}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 text-black">
            {event.league}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3">
          {getStatusBadge(event.status)}
        </div>
        
        <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
          <span className="text-lg font-bold text-foreground">{event.price}</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Trophy className="h-20 w-20 text-white/30" />
        </div>
        
        <div className="absolute bottom-3 left-3 text-white text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{event.capacity} capacity</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString('en-IN', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{event.venue}, {event.location}</span>
          </div>
        </div>

        {/* Teams */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">Teams/Players:</div>
          <div className="flex items-center justify-center">
            {event.teams.length === 2 ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{event.teams[0]}</span>
                <span className="text-muted-foreground">vs</span>
                <span className="font-medium">{event.teams[1]}</span>
              </div>
            ) : (
              <span className="text-sm font-medium">{event.teams[0]}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{event.rating}</span>
          </div>
          {event.status === 'selling-fast' && (
            <div className="flex items-center gap-1 text-red-600">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium">Hot</span>
            </div>
          )}
        </div>
        
        <Button className="w-full" size="sm">
          Book Tickets
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainHeader 
        currentLocation={currentLocation}
        onLocationClick={handleLocationClick}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Sports Events</h1>
              <p className="text-muted-foreground">Experience live sports action</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Sport</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {sports.map((sport) => (
                <Badge
                  key={sport}
                  variant={selectedSport === sport ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedSport(sport)}
                >
                  {sport}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">League</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {leagues.map((league) => (
                <Badge
                  key={league}
                  variant={selectedLeague === league ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap text-xs"
                  onClick={() => setSelectedLeague(league)}
                >
                  {league}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Match */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-red-600 text-white">MEGA MATCH</Badge>
            <Badge className="bg-orange-600 text-white">IPL 2024</Badge>
          </div>
          <h2 className="text-xl font-bold mb-2">Mumbai Indians vs Chennai Super Kings</h2>
          <p className="text-muted-foreground mb-4">
            The biggest rivalry in IPL cricket. Two titans clash at the iconic Wankhede Stadium. 
            Don't miss this epic encounter!
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Sept 25, 2024</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>7:30 PM</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Wankhede Stadium</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-red-500" />
              <span className="text-red-600 font-medium">Selling Fast</span>
            </div>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Book Now - ₹800 onwards
          </Button>
        </div>

        {/* Sports Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="cricket">Cricket</TabsTrigger>
            <TabsTrigger value="football">Football</TabsTrigger>
            <TabsTrigger value="other">Other Sports</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <SportCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cricket" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.filter(e => e.sport === 'Cricket').map((event) => (
                <SportCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="football" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.filter(e => e.sport === 'Football').map((event) => (
                <SportCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="other" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.filter(e => !['Cricket', 'Football'].includes(e.sport)).map((event) => (
                <SportCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Sports Stats */}
        <div className="bg-card rounded-xl p-6 mt-8">
          <h3 className="font-semibold mb-4">Sports in {currentLocation}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">8+</div>
              <div className="text-sm text-muted-foreground">Sports Venues</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Events/Year</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">500K+</div>
              <div className="text-sm text-muted-foreground">Sports Fans</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Sports Categories</div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Sports;