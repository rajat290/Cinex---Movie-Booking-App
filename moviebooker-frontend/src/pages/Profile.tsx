import React, { useState } from "react";
import { User, Settings, Heart, Ticket, Bell, HelpCircle, LogOut, MapPin, CreditCard, Star, Gift } from "lucide-react";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const [currentLocation, setCurrentLocation] = useState("Mumbai");
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleLocationClick = () => {
    const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const menuItems = [
    {
      icon: Ticket,
      title: "My Bookings",
      description: "View and manage your tickets",
      badge: "3",
      action: () => console.log("Navigate to bookings")
    },
    {
      icon: Heart,
      title: "Watchlist",
      description: "Your saved movies and events",
      badge: "12",
      action: () => console.log("Navigate to watchlist")
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your saved cards and wallets",
      action: () => console.log("Navigate to payments")
    },
    {
      icon: MapPin,
      title: "Saved Addresses",
      description: "Home, work and other locations",
      action: () => console.log("Navigate to addresses")
    },
    {
      icon: Gift,
      title: "Rewards & Offers",
      description: "Your points and exclusive deals",
      badge: "New",
      action: () => console.log("Navigate to rewards")
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your notification preferences",
      action: () => console.log("Navigate to notifications")
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Privacy, security and preferences",
      action: () => console.log("Navigate to settings")
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "FAQs, contact us and feedback",
      action: () => console.log("Navigate to help")
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainHeader 
        currentLocation={currentLocation}
        onLocationClick={handleLocationClick}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
                <p className="text-muted-foreground">john.doe@email.com</p>
                <p className="text-sm text-muted-foreground">+91 9876543210</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/5">
                    <Star className="h-3 w-3 mr-1" />
                    Gold Member
                  </Badge>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">Movies Watched</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-muted-foreground">Events Attended</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-yellow-600">1,250</div>
            <div className="text-sm text-muted-foreground">Reward Points</div>
          </Card>
        </div>

        {/* Current Membership */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Gold Membership</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Enjoy exclusive benefits and early access
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>✓ Priority booking</span>
                  <span>✓ 15% cashback</span>
                  <span>✓ Free cancellation</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Quick Settings</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Push Notifications</div>
                <div className="text-xs text-muted-foreground">
                  Get notified about bookings and offers
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Email Updates</div>
                <div className="text-xs text-muted-foreground">
                  Receive newsletters and promotional emails
                </div>
              </div>
              <Switch 
                checked={emailUpdates} 
                onCheckedChange={setEmailUpdates}
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4" onClick={item.action}>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      {item.badge && (
                        <Badge 
                          variant={item.badge === "New" ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sign Out */}
        <Card className="border-destructive/20">
          <CardContent className="p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            MovieSeat Booker Pro v2.1.0
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <button>Privacy Policy</button>
            <span>•</span>
            <button>Terms of Service</button>
            <span>•</span>
            <button>Rate Us</button>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Profile;