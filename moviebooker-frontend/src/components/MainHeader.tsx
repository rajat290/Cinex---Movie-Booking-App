import React from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { CategoryNav } from "@/components/CategoryNav";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface MainHeaderProps {
  currentLocation: string;
  onLocationClick: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ 
  currentLocation, 
  onLocationClick 
}) => {
  const { scrollDirection, isAtTop } = useScrollDirection();
  
  const isCollapsed = !isAtTop && scrollDirection === 'down';

  // Parse location for display (assuming format like "Mumbai" or "Krishna Colony, Mumbai")
  const locationParts = currentLocation.split(', ');
  const mainLocation = locationParts[0] || currentLocation;
  const subLocation = locationParts[1] || "Select Area";

  return (
    <header 
      className={`
        sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/30
        transition-all duration-500 ease-out shadow-card
        ${isCollapsed ? 'py-2 shadow-elevated' : 'py-4'}
      `}
    >
      {/* Main Header Content */}
      <div className="px-4">
        {/* Top Row - Location & Profile */}
        <div 
          className={`
            flex items-center justify-between mb-4
            transition-all duration-500 ease-out overflow-hidden
            ${isCollapsed ? 'h-0 opacity-0 mb-0 scale-95' : 'h-auto opacity-100 scale-100'}
          `}
        >
          <button 
            onClick={onLocationClick}
            className="flex items-center gap-2 text-left hover:opacity-80 transition-all duration-200 hover-lift"
          >
            <MapPin className="h-5 w-5 text-muted-foreground animate-bounce-subtle" />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-foreground font-medium">{mainLocation}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:rotate-180" />
              </div>
              <span className="text-sm text-muted-foreground">{subLocation}</span>
            </div>
          </button>
          
          <Avatar className="h-10 w-10 hover-lift transition-all duration-200 ring-2 ring-transparent hover:ring-primary/20">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
          </Avatar>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary" />
          <Input
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
            className="pl-10 h-12 bg-muted/50 border-0 rounded-xl text-base placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/50 hover:bg-muted/70 transition-all duration-200"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div 
        className={`
          px-4 pb-4 transition-all duration-500 ease-out overflow-hidden
          ${isCollapsed ? 'h-0 opacity-0 pb-0 scale-95' : 'h-auto opacity-100 scale-100'}
        `}
      >
        <CategoryNav />
      </div>
    </header>
  );
};