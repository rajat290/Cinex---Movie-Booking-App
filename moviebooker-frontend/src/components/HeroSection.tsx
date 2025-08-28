import React from "react";
import { Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroCinema from "@/assets/hero-cinema.jpg";

export const HeroSection: React.FC = () => {
  return (
    <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-elevated">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroCinema})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-12">
        <div className="max-w-lg space-y-6 animate-slide-up">
          <div className="space-y-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              <Calendar className="h-3 w-3 mr-1" />
              Now Playing
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Experience
              <span className="text-transparent bg-gradient-accent bg-clip-text"> Cinema</span>
              <br />Like Never Before
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Book your favorite movies, discover new releases, and secure the best seats 
              in town. Your perfect movie experience awaits.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="hero" className="animate-glow-pulse">
              <Play className="h-5 w-5 mr-2" />
              Book Now
            </Button>
            
            <Button variant="outline" size="hero" className="border-white/30 text-white hover:bg-white/10">
              Explore Movies
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-6 right-6 animate-float">
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20">
          <Play className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};