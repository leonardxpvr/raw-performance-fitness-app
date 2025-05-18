
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workouts from "./pages/Workouts";
import Programs from "./pages/Programs";
import AdminPrograms from "./pages/Programs"; // We'll update this later when creating the admin page
import Goals from "./pages/Goals";
import Progress from "./pages/Progress";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

// Components
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout fullWidth><Index /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workouts" element={<Layout><Workouts /></Layout>} />
            <Route path="/programs" element={<Layout><Programs /></Layout>} />
            <Route path="/goals" element={
              <PrivateRoute>
                <Layout><Goals /></Layout>
              </PrivateRoute>
            } />
            <Route path="/progress" element={
              <PrivateRoute>
                <Layout><Progress /></Layout>
              </PrivateRoute>
            } />
            <Route path="/subscription" element={
              <PrivateRoute>
                <Layout><Subscription /></Layout>
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Layout><Profile /></Layout>
              </PrivateRoute>
            } />
            <Route path="/admin/programs" element={
              <AdminRoute>
                <Layout><AdminPrograms /></Layout>
              </AdminRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
