import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories = [
  { id: "movies", label: "Movies", active: true },
  { id: "stream", label: "Stream" },
  { id: "events", label: "Events" },
  { id: "plays", label: "Plays" },
  { id: "sports", label: "Sports" },
  { id: "activities", label: "Activities" },
];

interface CategoryNavProps {
  onCategoryChange?: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState("movies");

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-1 p-1 bg-card/50 rounded-lg border border-border/30 backdrop-blur-sm">
        {categories.map((category, index) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "ghost"}
            size="sm"
            onClick={() => handleCategoryClick(category.id)}
            className={`
              whitespace-nowrap transition-all duration-300 hover-lift nav-link relative
              ${activeCategory === category.id 
                ? 'bg-primary text-primary-foreground shadow-glow animate-scale-in' 
                : 'hover:bg-secondary/70 text-muted-foreground hover:text-foreground'
              }
            `}
            style={{ 
              animationDelay: `${index * 50}ms`
            }}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};