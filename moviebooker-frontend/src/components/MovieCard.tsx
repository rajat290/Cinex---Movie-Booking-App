import React from "react";
import { Star, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Movie {
  id: string;
  title: string;
  image: string;
  rating: number;
  votes: string;
  genre: string[];
  language: string;
  format: string;
  isLiked?: boolean;
}

interface MovieCardProps {
  movie: Movie;
  onLike?: (movieId: string) => void;
  onClick?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onLike, onClick }) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border hover:border-primary/30 card-hover cursor-pointer shadow-card">
      <div onClick={() => onClick?.(movie)}>
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Like Button */}
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover-lift backdrop-blur-sm bg-black/30 hover:bg-black/50 ${
              movie.isLiked ? 'text-primary' : 'text-white hover:text-primary'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(movie.id);
            }}
          >
            <Heart className={`h-4 w-4 transition-all duration-200 ${movie.isLiked ? 'fill-current scale-110' : 'hover:scale-110'}`} />
          </Button>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 transform transition-all duration-300 group-hover:scale-105">
            <Badge variant="secondary" className="bg-black/80 text-white border-0 backdrop-blur-sm">
              <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold mr-1" />
              {movie.rating}/10 • {movie.votes}
            </Badge>
          </div>

          {/* Book Tickets Button - Shows on Hover */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
            <Button variant="hero" size="sm" className="w-full animate-glow-pulse">
              Book Tickets
            </Button>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 bg-card/95 backdrop-blur-sm">
          <h3 className="font-semibold text-foreground mb-2 truncate group-hover:text-primary transition-all duration-300 hover-lift">
            {movie.title}
          </h3>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {movie.genre.slice(0, 2).map((g, index) => (
                <Badge 
                  key={g} 
                  variant="outline" 
                  className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {g}
                </Badge>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80">
              {movie.language} • {movie.format}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};