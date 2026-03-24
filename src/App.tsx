import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";
import Index from "./pages/Index";

// Lazy-loaded pages
const About = lazy(() => import("./pages/About"));
const TeachersPage = lazy(() => import("./pages/TeachersPage"));
const NoticesPage = lazy(() => import("./pages/NoticesPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const AchievementsPage = lazy(() => import("./pages/AchievementsPage"));
const VideosPage = lazy(() => import("./pages/VideosPage"));
const NotesPage = lazy(() => import("./pages/NotesPage"));
const NotesClassPage = lazy(() => import("./pages/NotesClassPage"));
const NotesSubjectPage = lazy(() => import("./pages/NotesSubjectPage"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Dashboard
const DashboardTimetable = lazy(() => import("./pages/dashboard/DashboardTimetable"));
const DashboardResults = lazy(() => import("./pages/dashboard/DashboardResults"));
const DashboardNotices = lazy(() => import("./pages/dashboard/DashboardNotices"));
const DashboardNews = lazy(() => import("./pages/dashboard/DashboardNews"));
const DashboardLibrary = lazy(() => import("./pages/dashboard/DashboardLibrary"));
const DashboardGallery = lazy(() => import("./pages/dashboard/DashboardGallery"));
const DashboardAchievements = lazy(() => import("./pages/dashboard/DashboardAchievements"));
const DashboardTeachers = lazy(() => import("./pages/dashboard/DashboardTeachers"));
const DashboardVideos = lazy(() => import("./pages/dashboard/DashboardVideos"));

// Admin
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminSchoolInfo = lazy(() => import("./pages/admin/AdminSchoolInfo"));
const AdminTeachers = lazy(() => import("./pages/admin/AdminTeachers"));
const AdminNotices = lazy(() => import("./pages/admin/AdminNotices"));
const AdminNews = lazy(() => import("./pages/admin/AdminNews"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminLibrary = lazy(() => import("./pages/admin/AdminLibrary"));
const AdminTimetable = lazy(() => import("./pages/admin/AdminTimetable"));
const AdminResults = lazy(() => import("./pages/admin/AdminResults"));
const AdminAchievements = lazy(() => import("./pages/admin/AdminAchievements"));
const AdminVideos = lazy(() => import("./pages/admin/AdminVideos"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/gallery/:albumId" element={<GalleryPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/notes/class-:classNumber" element={<NotesClassPage />} />
              <Route path="/notes/class-:classNumber/:subject" element={<NotesSubjectPage />} />
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
              <Route path="/dashboard/gallery/:albumId" element={<ProtectedRoute><DashboardGallery /></ProtectedRoute>} />
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
              <Route path="/admin/gallery/:albumId" element={<ProtectedRoute requiredRole="admin"><AdminGallery /></ProtectedRoute>} />
              <Route path="/admin/videos" element={<ProtectedRoute requiredRole="admin"><AdminVideos /></ProtectedRoute>} />
              <Route path="/admin/library" element={<ProtectedRoute requiredRole="admin"><AdminLibrary /></ProtectedRoute>} />
              <Route path="/admin/timetable" element={<ProtectedRoute requiredRole="admin"><AdminTimetable /></ProtectedRoute>} />
              <Route path="/admin/results" element={<ProtectedRoute requiredRole="admin"><AdminResults /></ProtectedRoute>} />
              <Route path="/admin/achievements" element={<ProtectedRoute requiredRole="admin"><AdminAchievements /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
