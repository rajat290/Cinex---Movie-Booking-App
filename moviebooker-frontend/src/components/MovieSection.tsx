import React from "react";
import { ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard, Movie } from "./MovieCard";
import { 
  EnhancedCarousel, 
  EnhancedCarouselContent, 
  EnhancedCarouselItem 
} from "@/components/ui/enhanced-carousel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onViewAll?: () => void;
  onMovieClick?: (movie: Movie) => void;
  onMovieLike?: (movieId: string) => void;
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  onViewAll,
  onMovieClick,
  onMovieLike,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={ref}
      className={`space-y-4 animate-on-scroll ${isVisible ? 'in-view' : ''}`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        </div>
        
        {onViewAll && (
          <Button variant="ghost" onClick={onViewAll} className="text-primary hover:text-primary/80">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Movies Carousel */}
      <EnhancedCarousel
        className="w-full"
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          containScroll: "trimSnaps"
        }}
        showArrows={true}
      >
        <EnhancedCarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie, index) => (
            <EnhancedCarouselItem 
              key={movie.id} 
              className="pl-2 md:pl-4 basis-48 md:basis-52"
            >
              <div 
                className={`card-hover transition-all duration-300 ${
                  isVisible ? 'animate-scale-in' : ''
                }`}
                style={{ 
                  animationDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <MovieCard
                  movie={movie}
                  onClick={onMovieClick}
                  onLike={onMovieLike}
                />
              </div>
            </EnhancedCarouselItem>
          ))}
        </EnhancedCarouselContent>
      </EnhancedCarousel>
    </section>
  );
};