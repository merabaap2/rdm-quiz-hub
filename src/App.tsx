import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Play from "./pages/Play";
import Explore from "./pages/Explore";
import Revision from "./pages/Revision";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import Classrooms from "./pages/Classrooms";
import ClassroomDetail from "./pages/ClassroomDetail";
import JoinClassroom from "./pages/JoinClassroom";
import Mock from "./pages/Mock";
import Doubts from "./pages/Doubts";
import PublicProfile from "./pages/PublicProfile";
import EduFund from "./pages/EduFund";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="text-4xl animate-pulse">🎯</span></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!profile?.onboarding_complete) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/play" element={<ProtectedRoute><Play /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
      <Route path="/revision" element={<ProtectedRoute><Revision /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
      <Route path="/classrooms" element={<ProtectedRoute><Classrooms /></ProtectedRoute>} />
      <Route path="/mock" element={<ProtectedRoute><Mock /></ProtectedRoute>} />
      <Route path="/doubts" element={<ProtectedRoute><Doubts /></ProtectedRoute>} />
      <Route path="/edufund" element={<ProtectedRoute><EduFund /></ProtectedRoute>} />
      <Route path="/classroom/:id" element={<ProtectedRoute><ClassroomDetail /></ProtectedRoute>} />
      <Route path="/join/:classId" element={<JoinClassroom />} />
      <Route path="/user/:id" element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
