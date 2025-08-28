import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Events from "./pages/Events";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import Movies from "./pages/Movies";
import Stream from "./pages/Stream";
import Plays from "./pages/Plays";
import Sports from "./pages/Sports";
import MovieDetails from "./pages/MovieDetails";
import TheatreList from "./pages/TheatreList";
import SeatSelection from "./pages/SeatSelection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/events" element={<Events />} />
          <Route path="/plays" element={<Plays />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/theatres" element={<TheatreList />} />
          <Route path="/seats" element={<SeatSelection />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
