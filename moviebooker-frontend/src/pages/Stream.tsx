import React, { useState } from "react";
import { Play, Tv, Monitor, Smartphone, TrendingUp, Star, Clock } from "lucide-react";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample streaming content data
const streamingContent = [
  {
    id: "stream-1",
    title: "The Space Chronicles",
    description: "Epic sci-fi series about space exploration",
    image: "/placeholder.svg",
    rating: 8.9,
    duration: "45min",
    episodes: 12,
    season: 2,
    platform: "StreamMax",
    category: "Series",
    genre: ["Sci-Fi", "Drama"],
    isNew: true
  },
  {
    id: "stream-2",
    title: "Comedy Central Live",
    description: "Stand-up comedy special from top comedians",
    image: "/placeholder.svg",
    rating: 8.5,
    duration: "90min",
    platform: "LaughHub",
    category: "Special",
    genre: ["Comedy"],
    isNew: false
  },
  {
    id: "stream-3",
    title: "Mystery of the Lost City",
    description: "Thrilling adventure documentary",
    image: "/placeholder.svg",
    rating: 8.2,
    duration: "120min",
    platform: "DocuWorld",
    category: "Documentary",
    genre: ["Adventure", "Mystery"],
    isNew: true
  },
  {
    id: "stream-4",
    title: "Kitchen Masters",
    description: "Celebrity chefs compete in cooking challenges",
    image: "/placeholder.svg",
    rating: 7.8,
    duration: "60min",
    episodes: 8,
    season: 5,
    platform: "FoodTV",
    category: "Reality",
    genre: ["Reality", "Food"],
    isNew: false
  },
  {
    id: "stream-5",
    title: "Tech Talks",
    description: "Latest trends in technology and innovation",
    image: "/placeholder.svg",
    rating: 8.0,
    duration: "30min",
    episodes: 15,
    season: 1,
    platform: "TechStream",
    category: "Educational",
    genre: ["Technology", "Educational"],
    isNew: true
  }
];

const platforms = [
  { name: "All Platforms", count: streamingContent.length },
  { name: "StreamMax", count: 2 },
  { name: "LaughHub", count: 1 },
  { name: "DocuWorld", count: 1 },
  { name: "FoodTV", count: 1 }
];

const Stream = () => {
  const [currentLocation, setCurrentLocation] = useState("Mumbai");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [activeTab, setActiveTab] = useState("trending");

  const handleLocationClick = () => {
    const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const filteredContent = streamingContent.filter(content => 
    selectedPlatform === "All Platforms" || content.platform === selectedPlatform
  );

  const StreamCard = ({ content }: { content: typeof streamingContent[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 bg-black/50 rounded-full group-hover:bg-black/70 transition-colors">
            <Play className="h-8 w-8 text-white fill-current" />
          </div>
        </div>
        
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/70 text-white">
            {content.platform}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3 flex gap-2">
          {content.isNew && (
            <Badge className="bg-red-600 text-white">NEW</Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 text-black">
            {content.category}
          </Badge>
        </div>
        
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm">
          <Clock className="h-4 w-4" />
          <span>{content.duration}</span>
          {content.episodes && (
            <>
              <span>•</span>
              <span>{content.episodes} episodes</span>
            </>
          )}
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1">{content.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{content.rating}</span>
            </div>
            {content.season && (
              <span className="text-muted-foreground">Season {content.season}</span>
            )}
          </div>
          
          <div className="flex gap-1">
            {content.genre.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button className="w-full" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Watch Now
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
            <Tv className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Stream</h1>
              <p className="text-muted-foreground">Watch your favorite shows and movies</p>
            </div>
          </div>
        </div>

        {/* Platform Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Streaming Platforms</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {platforms.map((platform) => (
              <Badge
                key={platform.name}
                variant={selectedPlatform === platform.name ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedPlatform(platform.name)}
              >
                {platform.name} ({platform.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 mb-6">
          <Badge className="mb-4 bg-primary text-primary-foreground">Featured</Badge>
          <h2 className="text-xl font-bold mb-2">The Space Chronicles</h2>
          <p className="text-muted-foreground mb-4">
            Season 2 now streaming! Follow the crew as they explore new galaxies and face unexpected challenges.
          </p>
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>8.9</span>
            </div>
            <div className="flex items-center gap-1">
              <Tv className="h-4 w-4" />
              <span>12 Episodes</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>45min each</span>
            </div>
          </div>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Continue Watching
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New Releases</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
            <TabsTrigger value="movies">Movies</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Trending Now</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((content) => (
                <StreamCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 text-white">NEW</Badge>
              <h2 className="text-xl font-bold">New Releases</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.filter(c => c.isNew).map((content) => (
                <StreamCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="series" className="space-y-6">
            <div className="flex items-center gap-2">
              <Tv className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">TV Series</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.filter(c => c.episodes).map((content) => (
                <StreamCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="movies" className="space-y-6">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Movies & Specials</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.filter(c => !c.episodes).map((content) => (
                <StreamCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Download for Offline */}
        <div className="bg-card rounded-xl p-6 mt-8">
          <div className="flex items-center gap-4">
            <Smartphone className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Watch Offline</h3>
              <p className="text-sm text-muted-foreground">
                Download our mobile app to watch your favorite content offline
              </p>
            </div>
            <Button variant="outline">Download App</Button>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Stream;