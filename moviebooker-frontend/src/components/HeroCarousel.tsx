import React, { useCallback, useEffect } from "react";
import { Play, Calendar, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroCinema from "@/assets/hero-cinema.jpg";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  ctaText: string;
  ctaAction: () => void;
}

interface HeroCarouselProps {
  slides?: HeroSlide[];
}

const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Experience Cinema",
    subtitle: "Like Never Before",
    description: "Book your favorite movies, discover new releases, and secure the best seats in town. Your perfect movie experience awaits.",
    image: heroCinema,
    badge: "Now Playing",
    ctaText: "Book Now",
    ctaAction: () => console.log("Book Now clicked")
  },
  {
    id: "2", 
    title: "Premium",
    subtitle: "Movie Experience",
    description: "Enjoy blockbuster movies with premium sound, comfortable seating, and the latest releases before anyone else.",
    image: heroCinema,
    badge: "Premium",
    ctaText: "Explore Premium",
    ctaAction: () => console.log("Explore Premium clicked")
  },
  {
    id: "3",
    title: "Stream Anywhere",
    subtitle: "Watch Anytime",
    description: "Access thousands of movies and shows from the comfort of your home. Stream on any device, anywhere.",
    image: heroCinema,
    badge: "Stream Now",
    ctaText: "Start Streaming",
    ctaAction: () => console.log("Start Streaming clicked")
  }
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  slides = defaultSlides 
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 30,
      startIndex: 0
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-elevated">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  transform: selectedIndex === index ? 'scale(1)' : 'scale(1.05)'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="relative h-full flex items-center px-8 md:px-12">
                <div className={`max-w-lg space-y-6 transition-all duration-700 ${
                  selectedIndex === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}>
                  <div className="space-y-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/20 text-primary border-primary/30 animate-fade-in"
                      style={{ animationDelay: selectedIndex === index ? '0.2s' : '0s' }}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      {slide.badge}
                    </Badge>
                    
                    <h1 
                      className="text-4xl md:text-6xl font-bold text-white leading-tight"
                      style={{ animationDelay: selectedIndex === index ? '0.4s' : '0s' }}
                    >
                      {slide.title}
                      <span className="text-transparent bg-gradient-accent bg-clip-text">
                        {" " + slide.subtitle}
                      </span>
                    </h1>
                    
                    <p 
                      className="text-lg text-gray-300 leading-relaxed"
                      style={{ animationDelay: selectedIndex === index ? '0.6s' : '0s' }}
                    >
                      {slide.description}
                    </p>
                  </div>
                  
                  <div 
                    className="flex flex-col sm:flex-row gap-4"
                    style={{ animationDelay: selectedIndex === index ? '0.8s' : '0s' }}
                  >
                    <Button 
                      variant="hero" 
                      size="hero" 
                      className="hover-lift animate-glow-pulse"
                      onClick={slide.ctaAction}
                    >
                      <Play className="h-5 w-5 mr-2" />
                      {slide.ctaText}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="hero" 
                      className="border-white/30 text-white hover:bg-white/10 hover-lift"
                    >
                      Explore Movies
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 animate-float">
                <div className="bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20 hover-lift">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-8 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index 
                ? 'bg-primary scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Progress */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div 
          className="h-full bg-gradient-accent transition-all duration-300"
          style={{ 
            width: `${((selectedIndex + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};