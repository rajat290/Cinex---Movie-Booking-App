import React, { useState } from "react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MovieSection } from "@/components/MovieSection";
import { TrendingSection } from "@/components/TrendingSection";
import { PromoBanner } from "@/components/PromoBanner";
import { Advertisement } from "@/components/Advertisement";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Movie } from "@/components/MovieCard";
import { useNavigate } from "react-router-dom";

// Sample movie data with generated assets
import interstellarImg from "@/assets/movie-interstellar.jpg";
import crimsonImg from "@/assets/movie-crimson.jpg";
import comedyImg from "@/assets/movie-comedy.jpg";

// Advertisement images
import foodAdImg from "@/assets/ad-food-delivery.jpg";
import shoppingAdImg from "@/assets/ad-shopping-sale.jpg";
import concertAdImg from "@/assets/ad-concerts.jpg";

const sampleMovies: Movie[] = [
  {
    id: "interstellar",
    title: "Interstellar Odyssey", 
    image: interstellarImg,
    rating: 8.6,
    votes: "125K",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    language: "English",
    format: "2D, 3D, IMAX"
  },
  {
    id: "crimson",
    title: "Crimson Thunder",
    image: crimsonImg,
    rating: 7.8,
    votes: "89K", 
    genre: ["Action", "Thriller"],
    language: "English",
    format: "2D, 3D"
  },
  {
    id: "comedy",
    title: "Midnight Laughs",
    image: comedyImg,
    rating: 8.2,
    votes: "67K",
    genre: ["Comedy", "Romance"],
    language: "Hindi",
    format: "2D"
  },
  {
    id: "interstellar-2",
    title: "Space Explorers",
    image: interstellarImg,
    rating: 8.9,
    votes: "156K",
    genre: ["Sci-Fi", "Adventure"],
    language: "English", 
    format: "2D, 3D, IMAX"
  },
  {
    id: "crimson-2",
    title: "Thunder Strike",
    image: crimsonImg,
    rating: 7.5,
    votes: "92K",
    genre: ["Action", "Thriller"],
    language: "English",
    format: "2D, 3D"
  },
  {
    id: "comedy-2",
    title: "Love Actually",
    image: comedyImg,
    rating: 8.0,
    votes: "78K",
    genre: ["Romance", "Comedy"],
    language: "Hindi",
    format: "2D"
  }
];

// Sample trending items data
const trendingItems = [
  {
    id: "event-1",
    title: "Stand-Up Comedy Night",
    subtitle: "Featuring top comedians",
    image: comedyImg,
    rating: 9.1,
    duration: "2h 30m",
    location: "Comedy Club Mumbai",
    price: "299",
    category: "Comedy"
  },
  {
    id: "concert-1", 
    title: "Rock Concert Live",
    subtitle: "International band performance",
    image: concertAdImg,
    rating: 8.8,
    duration: "3h",
    location: "NSCI Stadium",
    price: "1299",
    category: "Concert"
  },
  {
    id: "sports-1",
    title: "IPL Match",
    subtitle: "Mumbai vs Chennai",
    image: interstellarImg,
    rating: 9.5,
    duration: "4h",
    location: "Wankhede Stadium",
    price: "799",
    category: "Sports"
  },
  {
    id: "play-1",
    title: "Shakespeare Drama",
    subtitle: "Classic theatre experience",
    image: crimsonImg,
    rating: 8.3,
    duration: "2h 15m",
    location: "Prithvi Theatre",
    price: "499",
    category: "Theatre"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [likedMovies, setLikedMovies] = useState<Set<string>>(new Set());
  const [currentLocation, setCurrentLocation] = useState("Mumbai");

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleMovieLike = (movieId: string) => {
    const newLikedMovies = new Set(likedMovies);
    if (newLikedMovies.has(movieId)) {
      newLikedMovies.delete(movieId);
    } else {
      newLikedMovies.add(movieId);
    }
    setLikedMovies(newLikedMovies);
  };

  const handleLocationClick = () => {
    // In a real app, this would open a location selector modal
    const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const moviesWithLikes = sampleMovies.map(movie => ({
    ...movie,
    isLiked: likedMovies.has(movie.id)
  }));

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Enhanced Header */}
      <MainHeader 
        currentLocation={currentLocation}
        onLocationClick={handleLocationClick}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero Carousel */}
      <HeroCarousel />

        {/* Promo Banner */}
        <PromoBanner
          title="Special Offer"
          subtitle="Get 20% Off on First Booking"
          description="Book your first movie ticket and get instant discount. Valid for all shows."
          badgeText="Limited Time"
          buttonText="Claim Now"
          onClick={() => console.log("Promo clicked")}
        />

        {/* Advertisement 1 */}
        <Advertisement
          title="Delicious Food"
          subtitle="Order from your favorite restaurants"
          image={foodAdImg}
          badgeText="HOT DEALS"
          onClick={() => console.log("Food ad clicked")}
        />

        {/* Hot Trending Section */}
        <TrendingSection
          title="Hot Pal On Trend"
          items={trendingItems}
          onItemClick={(item) => console.log("Trending item clicked:", item.title)}
        />

        {/* Movie Sections */}
        <MovieSection
          title="Recommended Movies"
          movies={moviesWithLikes.slice(0, 4)}
          onMovieClick={handleMovieClick}
          onMovieLike={handleMovieLike}
          onViewAll={() => console.log("View all recommended")}
        />

        {/* Advertisement 2 */}
        <Advertisement
          title="MEGA SALE"
          subtitle="Up to 70% off on fashion & electronics"
          image={shoppingAdImg}
          backgroundColor="bg-gradient-to-r from-purple-500 to-blue-500"
          badgeText="SALE"
          onClick={() => console.log("Shopping ad clicked")}
        />

        {/* More Movie Categories */}
        <MovieSection
          title="Action Movies"
          movies={moviesWithLikes.filter(m => m.genre.includes("Action"))}
          onMovieClick={handleMovieClick}
          onMovieLike={handleMovieLike}
          onViewAll={() => console.log("View all action")}
        />

        <MovieSection
          title="Comedy Shows"
          movies={moviesWithLikes.filter(m => m.genre.includes("Comedy"))}
          onMovieClick={handleMovieClick}
          onMovieLike={handleMovieLike}
          onViewAll={() => console.log("View all comedy")}
        />

        {/* Advertisement 3 */}
        <Advertisement
          title="Live Concerts"
          subtitle="Book tickets for upcoming shows"
          image={concertAdImg}
          backgroundColor="bg-gradient-to-r from-purple-900 to-blue-900"
          badgeText="LIVE"
          onClick={() => console.log("Concert ad clicked")}
        />

        {/* More Sections */}
        <MovieSection
          title="Sci-Fi Universe"
          movies={moviesWithLikes.filter(m => m.genre.includes("Sci-Fi"))}
          onMovieClick={handleMovieClick}
          onMovieLike={handleMovieLike}
          onViewAll={() => console.log("View all sci-fi")}
        />

        {/* New Promo Banner */}
        <PromoBanner
          title="Weekend Special"
          subtitle="Family Pack Available"
          description="Get 4 tickets for the price of 3. Perfect for family outings."
          badgeText="Weekend Only"
          buttonText="Book Family Pack"
          backgroundColor="bg-gradient-to-r from-green-500 to-teal-500"
          onClick={() => console.log("Family pack clicked")}
        />

        <MovieSection
          title="Thriller Movies"
          movies={moviesWithLikes.filter(m => m.genre.includes("Thriller"))}
          onMovieClick={handleMovieClick}
          onMovieLike={handleMovieLike}
          onViewAll={() => console.log("View all thriller")}
        />

        {/* Final Advertisement */}
        <Advertisement
          title="Travel Deals"
          subtitle="Explore amazing destinations"
          image={foodAdImg} // Using food image as placeholder
          backgroundColor="bg-gradient-to-r from-cyan-500 to-orange-500"
          badgeText="EXPLORE"
          onClick={() => console.log("Travel ad clicked")}
        />

        <MovieSection
          title="Romance Collection"
          movies={moviesWithLikes.filter(m => m.genre.includes("Romance"))}
          onMovieClick={handleMovieClick}
          onMovieLike={handleMovieLike}
          onViewAll={() => console.log("View all romance")}
        />
      </main>

      {/* Footer */}
      <footer className="bg-card/30 border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-semibold text-transparent bg-gradient-accent bg-clip-text mb-2">
              MovieSeat Booker Pro
            </p>
            <p className="text-sm">
              Your ultimate destination for movie bookings
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default Index;
