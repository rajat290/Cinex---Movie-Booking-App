import React from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onLocationClick?: () => void;
  location?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onLocationClick, 
  location = "Mumbai" 
}) => {
  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 shadow-card">
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Location Selector */}
        <Button
          variant="outline"
          onClick={onLocationClick}
          className="flex items-center gap-2 min-w-fit"
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span>{location}</span>
        </Button>

        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
            className="pl-10 bg-background/80 border-border focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};