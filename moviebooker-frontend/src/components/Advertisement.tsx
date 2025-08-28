import React from "react";
import { Badge } from "@/components/ui/badge";

interface AdvertisementProps {
  title: string;
  subtitle?: string;
  image: string;
  backgroundColor?: string;
  textColor?: string;
  badgeText?: string;
  onClick?: () => void;
}

export const Advertisement: React.FC<AdvertisementProps> = ({
  title,
  subtitle,
  image,
  backgroundColor = "bg-gradient-to-r from-orange-500 to-red-500",
  textColor = "text-white",
  badgeText,
  onClick,
}) => {
  return (
    <div 
      className={`
        relative rounded-xl overflow-hidden cursor-pointer
        transition-transform duration-200 hover:scale-[1.02]
        ${backgroundColor}
      `}
      onClick={onClick}
    >
      <div className="flex items-center p-4">
        <div className="flex-1 space-y-2">
          {badgeText && (
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
              {badgeText}
            </Badge>
          )}
          <h4 className={`font-bold text-lg ${textColor}`}>{title}</h4>
          {subtitle && (
            <p className={`text-sm opacity-90 ${textColor}`}>{subtitle}</p>
          )}
        </div>
        
        <div className="flex-shrink-0 ml-4">
          <img 
            src={image} 
            alt={title}
            className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};