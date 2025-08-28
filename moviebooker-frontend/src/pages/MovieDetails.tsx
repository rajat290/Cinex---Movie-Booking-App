import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Play, Share2, Heart, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getMovieById, MovieDTO } from "@/services/movies";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieById(id);
        setMovie(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load movie");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-6 text-sm text-red-500">{error}</div>;
  if (!movie) return <div className="container mx-auto px-4 py-6">Movie not found</div>;

  const handleBookTickets = () => {
    if (!id) return;
    navigate(`/theatres?movieId=${id}&city=Mumbai`);
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
                src={movie.poster}
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
                  {(movie.imdbRating ?? 0)}/10
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
                  <span>{movie.duration} mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(movie.releaseDate).toDateString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Language: </span>
                  <span>{movie.language.join(", ")}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Format: </span>
                  <span>{movie.formats.join(", ")}</span>
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
              <p className="text-muted-foreground leading-relaxed">{movie.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Cast</h4>
                <div className="space-y-1">
                  {movie.cast.map((actor, index) => (
                    <p key={index} className="text-sm text-muted-foreground">{actor.name} • {actor.role}</p>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">Crew</h4>
                <div className="space-y-1">
                  {movie.crew.map((member, index) => (
                    <p key={index} className="text-sm text-muted-foreground">{member.role}: {member.name}</p>
                  ))}
                </div>
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