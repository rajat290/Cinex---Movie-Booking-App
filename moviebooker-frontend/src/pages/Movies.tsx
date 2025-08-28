import React, { useEffect, useMemo, useState } from "react";
import { Film, Filter, Search, TrendingUp, Star } from "lucide-react";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { MovieSection } from "@/components/MovieSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie, MovieCard } from "@/components/MovieCard";
import { getMovies, MovieDTO } from "@/services/movies";
import { useNavigate } from "react-router-dom";

// Backend genres/languages are dynamic; we will fetch them later if needed

const movieCategories = ["All", "Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];
const languages = ["All", "Hindi", "English", "Tamil", "Telugu", "Bengali"];
const formats = ["All", "2D", "3D", "IMAX", "4DX"];

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

const Movies = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState("Mumbai");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedMovies, setLikedMovies] = useState<Set<string>>(new Set());
  const [moviesData, setMoviesData] = useState<MovieDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);
        const res = await getMovies({
          city: currentLocation,
          status: "running",
          page: 1,
          limit: 24,
          language: selectedLanguage !== "All" ? selectedLanguage : undefined,
          genre: selectedCategory !== "All" ? selectedCategory : undefined,
          format: selectedFormat !== "All" ? selectedFormat : undefined,
          search: searchQuery || undefined,
        });
        setMoviesData(res.movies || []);
      } catch (e: any) {
        setError(e?.message || "Failed to load movies");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
    return () => controller.abort();
  }, [currentLocation, selectedLanguage, selectedCategory, selectedFormat, searchQuery]);

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
    const newLikedMovies = new Set(likedMovies);
    if (newLikedMovies.has(movieId)) {
      newLikedMovies.delete(movieId);
    } else {
      newLikedMovies.add(movieId);
    }
    setLikedMovies(newLikedMovies);
  };

  const filteredMovies = useMemo(() => {
    const base = moviesData.map(mapDtoToUi);
    return base;
  }, [moviesData]);

  const moviesWithLikes = filteredMovies.map(movie => ({
    ...movie,
    isLiked: likedMovies.has(movie.id)
  }));

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
            <Film className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Movies</h1>
              <p className="text-muted-foreground">Book tickets for the latest movies</p>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for movies..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-6">
          {/* Genre Filter */}
          <div>
            <h3 className="text-sm font-medium mb-2">Genre</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {movieCategories.map((category) => (
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

          {/* Language & Format Filters */}
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
              <h3 className="text-sm font-medium mb-2">Format</h3>
              <div className="flex gap-2 overflow-x-auto">
                {formats.map((format) => (
                  <Badge
                    key={format}
                    variant={selectedFormat === format ? "default" : "outline"}
                    className="cursor-pointer whitespace-nowrap text-xs"
                    onClick={() => setSelectedFormat(format)}
                  >
                    {format}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Movies Tabs */}
        <Tabs defaultValue="now-showing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="now-showing">Now Showing</TabsTrigger>
            <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
          </TabsList>

          <TabsContent value="now-showing" className="space-y-6">
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            {loading && (
              <div className="text-sm text-muted-foreground">Loading movies...</div>
            )}
            <MovieSection
              title="Now Showing"
              movies={moviesWithLikes}
              onMovieClick={handleMovieClick}
              onMovieLike={handleMovieLike}
              onViewAll={() => console.log("View all now showing")}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {moviesWithLikes.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                  onLike={handleMovieLike}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="coming-soon" className="space-y-6">
            <div className="text-center py-8">
              <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Exciting new movies are coming to theaters near you!
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {moviesWithLikes.slice().reverse().map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                  onLike={handleMovieLike}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Trending Movies</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {moviesWithLikes.sort((a, b) => b.rating - a.rating).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                  onLike={handleMovieLike}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top-rated" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Top Rated Movies</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {moviesWithLikes.sort((a, b) => b.rating - a.rating).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                  onLike={handleMovieLike}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Movies;