import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import { HelmetProvider } from "react-helmet-async";

// Layouts and Auth
import MainLayout from "./components/common/MainLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ImpactVideosPage from "./pages/ImpactVideosPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import JoinTeamPage from "./pages/JoinTeamPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicationsPage from "./pages/PublicationsPage";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogList from "./pages/admin/AdminBlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import AdminGallery from "./pages/admin/AdminGallery";
import GalleryEditor from "./pages/admin/GalleryEditor";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import AdminVideos from "./pages/admin/AdminVideos";
import VideoEditor from "./pages/admin/VideoEditor";
import AdminPublications from "./pages/admin/AdminPublications";
import PublicationEditor from "./pages/admin/PublicationEditor";
import AdminMessages from "./pages/admin/AdminMessages";

const App: React.FC = () => {
  return (
    <>
      {/* <HelmetProvider> */}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="impact/gallery" element={<GalleryPage />} />
            <Route path="impact/videos" element={<ImpactVideosPage />} />
            <Route path="publications" element={<PublicationsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<SingleBlogPage />} />
            <Route path="join-team" element={<JoinTeamPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* --- Auth and Standalone Routes --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* --- Protected Admin Routes --- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />{" "}
            <Route path="blogs" element={<AdminBlogList />} />
            <Route path="blogs/new" element={<BlogEditor />} />
            <Route path="blogs/edit/:id" element={<BlogEditor />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="gallery/new" element={<GalleryEditor />} />
            <Route path="gallery/edit/:id" element={<GalleryEditor />} />
            <Route path="volunteers" element={<AdminVolunteers />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="videos/new" element={<VideoEditor />} />
            <Route path="videos/edit/:id" element={<VideoEditor />} />
            <Route path="publications" element={<AdminPublications />} />
            <Route path="publications/new" element={<PublicationEditor />} />
            <Route
              path="publications/edit/:id"
              element={<PublicationEditor />}
            />
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </HelmetProvider> */}
    </>
  );
};

export default App;
