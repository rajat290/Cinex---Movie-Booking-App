import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Play, Share2, Heart, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample movie data
const movieData = {
  "interstellar": {
    title: "Interstellar Odyssey",
    image: "/src/assets/movie-interstellar.jpg",
    rating: 8.6,
    votes: "125K",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    language: "English",
    format: "2D, 3D, IMAX",
    duration: "169 mins",
    releaseDate: "Nov 15, 2024",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival when Earth becomes uninhabitable.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    director: "Christopher Nolan"
  }
};

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const movie = movieData["interstellar"]; // Default to sample data

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleBookTickets = () => {
    navigate("/theatres");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Movie Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <Card className="overflow-hidden w-64 mx-auto lg:mx-0">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </Card>
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold mr-1" />
                  {movie.rating}/10 • {movie.votes} votes
                </Badge>
                
                <div className="flex gap-1">
                  {movie.genre.map((g) => (
                    <Badge key={g} variant="outline">{g}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{movie.releaseDate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Language: </span>
                  <span>{movie.language}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Format: </span>
                  <span>{movie.format}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="hero" onClick={handleBookTickets} className="flex-1 sm:flex-none">
                <Calendar className="h-5 w-5 mr-2" />
                Book Tickets
              </Button>
              <Button variant="outline" size="hero">
                <Play className="h-5 w-5 mr-2" />
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">About the Movie</h3>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Cast</h4>
                <div className="space-y-1">
                  {movie.cast.map((actor, index) => (
                    <p key={index} className="text-sm text-muted-foreground">{actor}</p>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">Crew</h4>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Director:</span> {movie.director}
                </p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Reviews coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MovieDetails;