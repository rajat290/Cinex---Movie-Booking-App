import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Home, Search, MapPin, Ticket, User } from "lucide-react";

export const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollDirection } = useScrollDirection();
  
  const isHidden = scrollDirection === 'down';

  const navItems = [
    { 
      id: 'home', 
      path: '/', 
      icon: Home, 
      label: 'Home' 
    },
    { 
      id: 'search', 
      path: '/search', 
      icon: Search, 
      label: 'Search' 
    },
    { 
      id: 'events', 
      path: '/events-nearby', 
      icon: MapPin, 
      label: 'Events' 
    },
    { 
      id: 'tickets', 
      path: '/my-tickets', 
      icon: Ticket, 
      label: 'Tickets' 
    },
    { 
      id: 'profile', 
      path: '/profile', 
      icon: User, 
      label: 'Profile' 
    }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav 
      className={`
        fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm
        border-t border-border md:hidden
        transition-transform duration-300 ease-in-out
        ${isHidden ? 'translate-y-full' : 'translate-y-0'}
      `}
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`
                flex flex-col items-center gap-1 py-2 px-3 rounded-lg
                transition-colors duration-200 min-w-0 flex-1
                ${isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <IconComponent 
                size={20} 
                className={isActive ? 'text-primary' : 'text-current'} 
              />
              <span className="text-xs font-medium truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
};