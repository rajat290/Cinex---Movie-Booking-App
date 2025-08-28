import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

interface PromoBannerProps {
  title: string;
  subtitle?: string;
  description: string;
  badgeText?: string;
  buttonText: string;
  backgroundImage?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  subtitle,
  description,
  badgeText,
  buttonText,
  backgroundImage,
  backgroundColor = "bg-gradient-to-r from-primary to-primary-glow",
  onClick,
}) => {
  return (
    <div 
      className={`
        relative rounded-xl p-6 text-white overflow-hidden
        ${backgroundImage ? 'bg-cover bg-center' : backgroundColor}
      `}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* Gradient overlay for better text readability */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 rounded-xl" />
      )}
      
      <div className="relative z-10">
        {badgeText && (
          <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
            <Star className="h-3 w-3 mr-1" />
            {badgeText}
          </Badge>
        )}
        
        <div className="space-y-2 mb-4">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          {subtitle && (
            <p className="text-white/90 text-sm">{subtitle}</p>
          )}
          <p className="text-white/80 text-sm">{description}</p>
        </div>
        
        <Button 
          onClick={onClick}
          variant="secondary" 
          className="bg-white text-primary hover:bg-white/90"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};