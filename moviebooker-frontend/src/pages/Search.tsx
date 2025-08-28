import React, { useState } from "react";
import { Search as SearchIcon, Clock, TrendingUp, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { MovieCard, Movie } from "@/components/MovieCard";
import { useNavigate } from "react-router-dom";

// Sample data
import interstellarImg from "@/assets/movie-interstellar.jpg";
import crimsonImg from "@/assets/movie-crimson.jpg";
import comedyImg from "@/assets/movie-comedy.jpg";

const suggestions = [
  "Interstellar", "Avengers", "Spider-Man", "Batman", "Superman",
  "Comedy Shows", "Horror Movies", "Action Thriller", "Romantic Comedy"
];

const trendingSearches = [
  "IPL 2024", "Stand-up Comedy", "Bollywood Movies", "Hollywood Action",
  "Concert Tickets", "Theatre Shows", "Kids Movies", "Documentary Films"
];

const recentSearches = [
  "Interstellar Odyssey", "Comedy Night", "Rock Concert", "IPL Match"
];

const sampleResults: Movie[] = [
  {
    id: "search-1",
    title: "Interstellar Odyssey",
    image: interstellarImg,
    rating: 8.6,
    votes: "125K",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    format: "2D, 3D, IMAX"
  },
  {
    id: "search-2",
    title: "Crimson Thunder",
    image: crimsonImg,
    rating: 7.8,
    votes: "89K",
    genre: ["Action", "Thriller"],
    language: "English",
    format: "2D, 3D"
  },
  {
    id: "search-3",
    title: "Midnight Laughs",
    image: comedyImg,
    rating: 8.2,
    votes: "67K",
    genre: ["Comedy", "Romance"],
    language: "Hindi",
    format: "2D"
  }
];

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Mumbai");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const handleLocationClick = () => {
    const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainHeader 
        currentLocation={currentLocation}
        onLocationClick={handleLocationClick}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Enhanced Search Bar */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              className="pl-12 pr-16 h-14 bg-muted/50 border-0 rounded-xl text-base placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button size="icon" variant="ghost" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>

        {!showResults ? (
          <div className="space-y-8">
            {/* Search Suggestions */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <SearchIcon className="h-5 w-5 text-primary" />
                Popular Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="secondary"
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowResults(true);
                    }}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Trending Searches */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Now
              </h2>
              <div className="space-y-3">
                {trendingSearches.map((search, index) => (
                  <div
                    key={search}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSearchQuery(search);
                      setShowResults(true);
                    }}
                  >
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{search}</span>
                    <span className="text-sm text-muted-foreground">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Searches */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Searches
              </h2>
              <div className="space-y-2">
                {recentSearches.map((search) => (
                  <div
                    key={search}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSearchQuery(search);
                      setShowResults(true);
                    }}
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{search}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Suggested Categories */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Movies", "Events", "Sports", "Theatre", "Comedy", "Concerts", "Kids", "Documentary"].map((category) => (
                  <div
                    key={category}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl text-center cursor-pointer hover:from-primary/20 hover:to-primary/10 transition-all duration-200"
                    onClick={() => navigate(`/category/${category.toLowerCase()}`)}
                  >
                    <h3 className="font-semibold text-foreground">{category}</h3>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Search Results */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Search Results for "{searchQuery}"</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowResults(false)}
              >
                Clear Search
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sampleResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>

            {/* Filter Options */}
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">All</Badge>
              <Badge variant="outline">Movies</Badge>
              <Badge variant="outline">Events</Badge>
              <Badge variant="outline">Sports</Badge>
              <Badge variant="outline">Theatre</Badge>
            </div>
          </div>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Search;