import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import TeachersPage from "./pages/TeachersPage";
import NoticesPage from "./pages/NoticesPage";
import NewsPage from "./pages/NewsPage";
import ResultsPage from "./pages/ResultsPage";
import GalleryPage from "./pages/GalleryPage";
import LibraryPage from "./pages/LibraryPage";
import AchievementsPage from "./pages/AchievementsPage";
import VideosPage from "./pages/VideosPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardTimetable from "./pages/dashboard/DashboardTimetable";
import DashboardResults from "./pages/dashboard/DashboardResults";
import DashboardNotices from "./pages/dashboard/DashboardNotices";
import DashboardNews from "./pages/dashboard/DashboardNews";
import DashboardLibrary from "./pages/dashboard/DashboardLibrary";
import DashboardGallery from "./pages/dashboard/DashboardGallery";
import DashboardAchievements from "./pages/dashboard/DashboardAchievements";
import DashboardTeachers from "./pages/dashboard/DashboardTeachers";
import DashboardVideos from "./pages/dashboard/DashboardVideos";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminSchoolInfo from "./pages/admin/AdminSchoolInfo";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminNews from "./pages/admin/AdminNews";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminLibrary from "./pages/admin/AdminLibrary";
import AdminTimetable from "./pages/admin/AdminTimetable";
import AdminResults from "./pages/admin/AdminResults";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminVideos from "./pages/admin/AdminVideos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* User Dashboard - Protected */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardTimetable /></ProtectedRoute>} />
            <Route path="/dashboard/timetable" element={<ProtectedRoute><DashboardTimetable /></ProtectedRoute>} />
            <Route path="/dashboard/results" element={<ProtectedRoute><DashboardResults /></ProtectedRoute>} />
            <Route path="/dashboard/notices" element={<ProtectedRoute><DashboardNotices /></ProtectedRoute>} />
            <Route path="/dashboard/news" element={<ProtectedRoute><DashboardNews /></ProtectedRoute>} />
            <Route path="/dashboard/library" element={<ProtectedRoute><DashboardLibrary /></ProtectedRoute>} />
            <Route path="/dashboard/gallery" element={<ProtectedRoute><DashboardGallery /></ProtectedRoute>} />
            <Route path="/dashboard/videos" element={<ProtectedRoute><DashboardVideos /></ProtectedRoute>} />
            <Route path="/dashboard/achievements" element={<ProtectedRoute><DashboardAchievements /></ProtectedRoute>} />
            <Route path="/dashboard/teachers" element={<ProtectedRoute><DashboardTeachers /></ProtectedRoute>} />
            {/* Admin Dashboard - Protected + Admin only */}
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminOverview /></ProtectedRoute>} />
            <Route path="/admin/school-info" element={<ProtectedRoute requiredRole="admin"><AdminSchoolInfo /></ProtectedRoute>} />
            <Route path="/admin/teachers" element={<ProtectedRoute requiredRole="admin"><AdminTeachers /></ProtectedRoute>} />
            <Route path="/admin/notices" element={<ProtectedRoute requiredRole="admin"><AdminNotices /></ProtectedRoute>} />
            <Route path="/admin/news" element={<ProtectedRoute requiredRole="admin"><AdminNews /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute requiredRole="admin"><AdminGallery /></ProtectedRoute>} />
            <Route path="/admin/videos" element={<ProtectedRoute requiredRole="admin"><AdminVideos /></ProtectedRoute>} />
            <Route path="/admin/library" element={<ProtectedRoute requiredRole="admin"><AdminLibrary /></ProtectedRoute>} />
            <Route path="/admin/timetable" element={<ProtectedRoute requiredRole="admin"><AdminTimetable /></ProtectedRoute>} />
            <Route path="/admin/results" element={<ProtectedRoute requiredRole="admin"><AdminResults /></ProtectedRoute>} />
            <Route path="/admin/achievements" element={<ProtectedRoute requiredRole="admin"><AdminAchievements /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
