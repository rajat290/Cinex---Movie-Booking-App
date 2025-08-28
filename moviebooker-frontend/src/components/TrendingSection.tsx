import React from "react";
import { TrendingUp, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TrendingItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  rating?: number;
  duration?: string;
  location?: string;
  price?: string;
  category: string;
}

interface TrendingSectionProps {
  title: string;
  items: TrendingItem[];
  onItemClick?: (item: TrendingItem) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  title,
  items,
  onItemClick,
}) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onItemClick?.(item)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-24 h-32 object-cover"
                />
              </div>
              
              <div className="flex-1 p-4 space-y-2">
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                  <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.subtitle}</p>
                  )}
                </div>
                
                <div className="space-y-1 text-xs text-muted-foreground">
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>{item.rating}/10</span>
                    </div>
                  )}
                  
                  {item.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                  
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
                
                {item.price && (
                  <div className="pt-2">
                    <span className="text-primary font-semibold">₹{item.price}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};