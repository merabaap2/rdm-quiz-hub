import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Play from "./pages/Play";
import Explore from "./pages/Explore";
import Revision from "./pages/Revision";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((s) => s.user);
  if (!user?.isSignedUp) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/play" element={<ProtectedRoute><Play /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
          <Route path="/revision" element={<ProtectedRoute><Revision /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
