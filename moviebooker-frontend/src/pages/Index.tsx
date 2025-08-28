import React, { useState, useEffect } from "react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MovieSection } from "@/components/MovieSection";
import { TrendingSection } from "@/components/TrendingSection";
import { PromoBanner } from "@/components/PromoBanner";
import { Advertisement } from "@/components/Advertisement";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Movie } from "@/components/MovieCard";
import { useNavigate } from "react-router-dom";
import { getMovies, MovieDTO } from "@/services/movies";

// Advertisement images
import foodAdImg from "@/assets/ad-food-delivery.jpg";
import shoppingAdImg from "@/assets/ad-shopping-sale.jpg";
import concertAdImg from "@/assets/ad-concerts.jpg";

// Function to map backend movie data to UI format
function mapDtoToUi(movie: MovieDTO): Movie {
  return {
    id: movie._id,
    title: movie.title,
    image: movie.poster,
    rating: movie.imdbRating ?? 0,
    votes: "—",
    genre: movie.genre,
    language: movie.language[0] || "",
    format: movie.formats.join(", ")
  };
}

const Index = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState("Delhi");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch movies from backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMovies({
          status: "running",
          page: 1,
          limit: 10
        });
        const movieList = (response.movies || []).map(mapDtoToUi);
        setMovies(movieList);
      } catch (err: any) {
        setError(err?.message || "Failed to load movies");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleLocationClick = () => {
    const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleMovieLike = (movieId: string) => {
    // TODO: Implement like functionality
    console.log("Liked movie:", movieId);
  };

  const handleViewAllMovies = () => {
    navigate("/movies");
  };

  // Sample trending items data (keeping this for now)
  const trendingItems = [
    {
      id: "event-1",
      title: "Stand-Up Comedy Night",
      subtitle: "Featuring top comedians",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      rating: 9.1,
      duration: "2h 30m",
      location: "Comedy Club Mumbai",
      price: "299",
      category: "Comedy"
    },
    {
      id: "concert-1", 
      title: "Rock Concert Live",
      subtitle: "Greatest hits of all time",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
      rating: 9.5,
      duration: "3h 15m",
      location: "Stadium Arena",
      price: "899",
      category: "Music"
    }
  ];

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
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading movies...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-primary hover:underline mt-2"
            >
              Try again
            </button>
          </div>
        ) : movies.length > 0 ? (
          <MovieSection
            title="Recommended Movies"
            movies={movies}
            onMovieClick={handleMovieClick}
            onMovieLike={handleMovieLike}
            onViewAll={handleViewAllMovies}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No movies available</p>
          </div>
        )}

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
        {!loading && !error && movies.filter(m => m.genre.includes("Action")).length > 0 && (
          <MovieSection
            title="Action Movies"
            movies={movies.filter(m => m.genre.includes("Action"))}
            onMovieClick={handleMovieClick}
            onMovieLike={handleMovieLike}
            onViewAll={handleViewAllMovies}
          />
        )}

        {!loading && !error && movies.filter(m => m.genre.includes("Comedy")).length > 0 && (
          <MovieSection
            title="Comedy Shows"
            movies={movies.filter(m => m.genre.includes("Comedy"))}
            onMovieClick={handleMovieClick}
            onMovieLike={handleMovieLike}
            onViewAll={handleViewAllMovies}
          />
        )}

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
        {!loading && !error && movies.filter(m => m.genre.includes("Sci-Fi")).length > 0 && (
          <MovieSection
            title="Sci-Fi Universe"
            movies={movies.filter(m => m.genre.includes("Sci-Fi"))}
            onMovieClick={handleMovieClick}
            onMovieLike={handleMovieLike}
            onViewAll={handleViewAllMovies}
          />
        )}

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

        {!loading && !error && movies.filter(m => m.genre.includes("Thriller")).length > 0 && (
          <MovieSection
            title="Thriller Movies"
            movies={movies.filter(m => m.genre.includes("Thriller"))}
            onMovieClick={handleMovieClick}
            onMovieLike={handleMovieLike}
            onViewAll={handleViewAllMovies}
          />
        )}

        {/* Final Advertisement */}
        <Advertisement
          title="Travel Deals"
          subtitle="Explore amazing destinations"
          image={foodAdImg} // Using food image as placeholder
          backgroundColor="bg-gradient-to-r from-cyan-500 to-orange-500"
          badgeText="EXPLORE"
          onClick={() => console.log("Travel ad clicked")}
        />

        {!loading && !error && movies.filter(m => m.genre.includes("Romance")).length > 0 && (
          <MovieSection
            title="Romance Collection"
            movies={movies.filter(m => m.genre.includes("Romance"))}
            onMovieClick={handleMovieClick}
            onMovieLike={handleMovieLike}
            onViewAll={handleViewAllMovies}
          />
        )}
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
