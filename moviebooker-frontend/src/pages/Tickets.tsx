import React, { useState } from "react";
import { Ticket, Calendar, MapPin, Clock, QrCode, Download, Share } from "lucide-react";
import { MainHeader } from "@/components/MainHeader";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const tickets = [
  {
    id: "ticket-1",
    title: "Interstellar Odyssey",
    type: "Movie",
    status: "confirmed",
    date: "2024-09-15",
    time: "7:30 PM",
    venue: "PVR Cinemas",
    location: "Phoenix Mall, Mumbai",
    seats: ["H-15", "H-16"],
    totalAmount: "₹640",
    bookingId: "BK123456789",
    qrCode: "/placeholder.svg"
  },
  {
    id: "ticket-2",
    title: "Stand-Up Comedy Night",
    type: "Event",
    status: "confirmed",
    date: "2024-09-20",
    time: "8:00 PM",
    venue: "Comedy Club Mumbai",
    location: "Bandra West, Mumbai",
    seats: ["A-12"],
    totalAmount: "₹299",
    bookingId: "BK987654321",
    qrCode: "/placeholder.svg"
  },
  {
    id: "ticket-3",
    title: "IPL Match - MI vs CSK",
    type: "Sports",
    status: "upcoming",
    date: "2024-09-25",
    time: "7:30 PM",
    venue: "Wankhede Stadium",
    location: "Churchgate, Mumbai",
    seats: ["East Stand - E-45"],
    totalAmount: "₹1200",
    bookingId: "BK456789123",
    qrCode: "/placeholder.svg"
  },
  {
    id: "ticket-4",
    title: "Romeo and Juliet",
    type: "Theatre",
    status: "expired",
    date: "2024-08-30",
    time: "6:00 PM",
    venue: "Prithvi Theatre",
    location: "Juhu, Mumbai",
    seats: ["Row C - 8", "Row C - 9"],
    totalAmount: "₹800",
    bookingId: "BK789123456",
    qrCode: "/placeholder.svg"
  }
];

const Tickets = () => {
  const [currentLocation, setCurrentLocation] = useState("Mumbai");
  const [activeTab, setActiveTab] = useState("active");

  const handleLocationClick = () => {
    const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'upcoming':
        return 'Upcoming';
      case 'expired':
        return 'Expired';
      default:
        return status;
    }
  };

  const TicketCard = ({ ticket }: { ticket: typeof tickets[0] }) => (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{ticket.title}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{ticket.type}</Badge>
              <Badge className={getStatusColor(ticket.status)}>
                {getStatusText(ticket.status)}
              </Badge>
            </div>
          </div>
          <QrCode className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(ticket.date).toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{ticket.time}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{ticket.venue}, {ticket.location}</span>
          </div>
        </div>

        <Separator />

        {/* Booking Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking ID:</span>
            <span className="font-mono">{ticket.bookingId}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seats:</span>
            <span className="font-semibold">{ticket.seats.join(", ")}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Amount:</span>
            <span className="font-semibold text-primary">{ticket.totalAmount}</span>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          {ticket.status === 'confirmed' && (
            <Button size="sm" className="flex-1">
              <QrCode className="h-4 w-4 mr-2" />
              Show QR
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const activeTickets = tickets.filter(ticket => ticket.status !== 'expired');
  const expiredTickets = tickets.filter(ticket => ticket.status === 'expired');

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainHeader 
        currentLocation={currentLocation}
        onLocationClick={handleLocationClick}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Ticket className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Tickets</h1>
              <p className="text-muted-foreground">Manage your bookings and tickets</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary">{activeTickets.length}</div>
            <div className="text-sm text-muted-foreground">Active Tickets</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">
              {tickets.filter(t => t.status === 'confirmed').length}
            </div>
            <div className="text-sm text-muted-foreground">Confirmed</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">
              {tickets.filter(t => t.status === 'upcoming').length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-600">{expiredTickets.length}</div>
            <div className="text-sm text-muted-foreground">Past Events</div>
          </Card>
        </div>

        {/* Tickets Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">Active Tickets ({activeTickets.length})</TabsTrigger>
            <TabsTrigger value="history">Booking History ({expiredTickets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeTickets.length > 0 ? (
              activeTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <div className="text-center py-12">
                <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Tickets</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any active tickets right now.
                </p>
                <Button>Browse Events</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {expiredTickets.length > 0 ? (
              expiredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Past Bookings</h3>
                <p className="text-muted-foreground">
                  Your booking history will appear here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Tickets;