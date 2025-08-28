import React, { useState } from "react";
import { Drama, MapPin, Calendar, Clock, Users, Star } from "lucide-react";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const plays = [
  {
    id: "play-1",
    title: "Romeo and Juliet",
    description: "Shakespeare's timeless tale of love and tragedy",
    image: "/placeholder.svg",
    date: "2024-09-20",
    time: "7:30 PM",
    venue: "Prithvi Theatre",
    location: "Juhu, Mumbai",
    price: "₹500",
    rating: 4.8,
    duration: "2h 30m",
    language: "English",
    category: "Classic",
    director: "Rajesh Kumar",
    cast: ["Aadhya Sharma", "Vikram Singh", "Priya Nair"]
  },
  {
    id: "play-2",
    title: "The Merchant of Venice",
    description: "A modern adaptation of Shakespeare's comedy",
    image: "/placeholder.svg",
    date: "2024-09-25",
    time: "8:00 PM",
    venue: "NCPA Theatre",
    location: "Nariman Point, Mumbai",
    price: "₹750",
    rating: 4.6,
    duration: "2h 15m",
    language: "English",
    category: "Comedy",
    director: "Meera Joshi",
    cast: ["Arjun Kapoor", "Shreya Ghosh", "Rahul Bhat"]
  },
  {
    id: "play-3",
    title: "Tumhari Amrita",
    description: "A heartwarming Hindi play about relationships",
    image: "/placeholder.svg",
    date: "2024-09-30",
    time: "6:00 PM",
    venue: "Experimental Theatre",
    location: "Andheri West, Mumbai",
    price: "₹400",
    rating: 4.9,
    duration: "1h 45m",
    language: "Hindi",
    category: "Drama",
    director: "Sanjay Leela Bhansali",
    cast: ["Konkona Sen", "Irrfan Khan", "Ratna Pathak"]
  },
  {
    id: "play-4",
    title: "Andha Yug",
    description: "Epic Sanskrit drama about the aftermath of war",
    image: "/placeholder.svg",
    date: "2024-10-05",
    time: "7:00 PM",
    venue: "Tata Theatre",
    location: "Nariman Point, Mumbai",
    price: "₹600",
    rating: 4.7,
    duration: "3h",
    language: "Hindi",
    category: "Epic",
    director: "Arvind Gaur",
    cast: ["Naseeruddin Shah", "Ratna Pathak Shah", "Vinay Pathak"]
  }
];

const categories = ["All", "Classic", "Comedy", "Drama", "Epic", "Musical", "Contemporary"];
const languages = ["All", "English", "Hindi", "Marathi", "Gujarati"];
const venues = ["All", "Prithvi Theatre", "NCPA Theatre", "Experimental Theatre", "Tata Theatre"];

const Plays = () => {
  const [currentLocation, setCurrentLocation] = useState("Mumbai");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedVenue, setSelectedVenue] = useState("All");

  const handleLocationClick = () => {
    const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const filteredPlays = plays.filter(play => {
    const categoryMatch = selectedCategory === "All" || play.category === selectedCategory;
    const languageMatch = selectedLanguage === "All" || play.language === selectedLanguage;
    const venueMatch = selectedVenue === "All" || play.venue === selectedVenue;
    
    return categoryMatch && languageMatch && venueMatch;
  });

  const PlayCard = ({ play }: { play: typeof plays[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
        <div className="absolute top-3 left-3">
          <Badge className="bg-purple-600 text-white">
            {play.category}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-black">
            {play.language}
          </Badge>
        </div>
        
        <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-sm font-semibold text-foreground">{play.price}</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Drama className="h-16 w-16 text-white/50" />
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1">{play.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{play.description}</p>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(play.date).toLocaleDateString()}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span>{play.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{play.venue}, {play.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Dir: {play.director}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{play.rating}</span>
            <span className="text-sm text-muted-foreground">({play.duration})</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Cast:</div>
          <div className="flex flex-wrap gap-1">
            {play.cast.slice(0, 2).map((actor, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {actor}
              </Badge>
            ))}
            {play.cast.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{play.cast.length - 2} more
              </Badge>
            )}
          </div>
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
            <Drama className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Theatre Plays</h1>
              <p className="text-muted-foreground">Experience the magic of live theatre</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Category</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Language</h3>
              <div className="flex gap-2 overflow-x-auto">
                {languages.map((language) => (
                  <Badge
                    key={language}
                    variant={selectedLanguage === language ? "default" : "outline"}
                    className="cursor-pointer whitespace-nowrap text-xs"
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Venue</h3>
              <div className="flex gap-2 overflow-x-auto">
                {venues.slice(0, 3).map((venue) => (
                  <Badge
                    key={venue}
                    variant={selectedVenue === venue ? "default" : "outline"}
                    className="cursor-pointer whitespace-nowrap text-xs"
                    onClick={() => setSelectedVenue(venue)}
                  >
                    {venue}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Play */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 mb-6">
          <Badge className="mb-4 bg-purple-600 text-white">Featured Play</Badge>
          <h2 className="text-xl font-bold mb-2">Tumhari Amrita</h2>
          <p className="text-muted-foreground mb-4">
            A beautiful story of love, friendship and relationships spanning decades. 
            Directed by Sanjay Leela Bhansali with stellar performances.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Sept 30, 2024</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Experimental Theatre</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.9</span>
            </div>
          </div>
          <Button>Book Now - ₹400</Button>
        </div>

        {/* Plays Tabs */}
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Currently Running</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Shows</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlays.map((play) => (
                <PlayCard key={play.id} play={play} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="text-center py-8">
              <Drama className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Exciting Shows Coming Soon</h3>
              <p className="text-muted-foreground">
                New theatrical productions are being scheduled. Stay tuned!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlays.slice().reverse().map((play) => (
                <PlayCard key={play.id} play={play} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="space-y-6">
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Theatre Workshops</h3>
              <p className="text-muted-foreground mb-4">
                Learn acting, directing, and stagecraft from industry professionals
              </p>
              <Button>Explore Workshops</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Theatre Info */}
        <div className="bg-card rounded-xl p-6 mt-8">
          <h3 className="font-semibold mb-4">About Theatre in {currentLocation}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {currentLocation} has a rich theatrical heritage with venues like Prithvi Theatre, NCPA, and Experimental Theatre 
            offering diverse productions from classical to contemporary works.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Active Venues</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Shows Yearly</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Theatre Groups</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Plays;