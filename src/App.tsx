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
import EduFundProposal from "./pages/EduFundProposal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/auth" element={<Navigate to="/home" replace />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/play" element={<Play />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/revision" element={<Revision />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/classrooms" element={<Classrooms />} />
      <Route path="/mock" element={<Mock />} />
      <Route path="/doubts" element={<Doubts />} />
      <Route path="/edufund" element={<EduFund />} />
      <Route path="/edufund/:id" element={<EduFundProposal />} />
      <Route path="/classroom/:id" element={<ClassroomDetail />} />
      <Route path="/join/:classId" element={<JoinClassroom />} />
      <Route path="/user/:id" element={<PublicProfile />} />
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
