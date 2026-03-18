import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
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
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* User Dashboard */}
            <Route path="/dashboard" element={<DashboardTimetable />} />
            <Route path="/dashboard/timetable" element={<DashboardTimetable />} />
            <Route path="/dashboard/results" element={<DashboardResults />} />
            <Route path="/dashboard/notices" element={<DashboardNotices />} />
            <Route path="/dashboard/news" element={<DashboardNews />} />
            <Route path="/dashboard/library" element={<DashboardLibrary />} />
            <Route path="/dashboard/gallery" element={<DashboardGallery />} />
            <Route path="/dashboard/achievements" element={<DashboardAchievements />} />
            <Route path="/dashboard/teachers" element={<DashboardTeachers />} />
            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/school-info" element={<AdminSchoolInfo />} />
            <Route path="/admin/teachers" element={<AdminTeachers />} />
            <Route path="/admin/notices" element={<AdminNotices />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/library" element={<AdminLibrary />} />
            <Route path="/admin/timetable" element={<AdminTimetable />} />
            <Route path="/admin/results" element={<AdminResults />} />
            <Route path="/admin/achievements" element={<AdminAchievements />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
