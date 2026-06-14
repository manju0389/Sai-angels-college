import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import { useEffect } from "react";
import axios from "axios";

// Public pages
import Home from "./pages/home";
import About from "./pages/about";
import Achievements from "./pages/achievements";
import Admission from "./pages/admission";
import Gallery from "./pages/gallery";
import Video from "./pages/video";
import Curriculum from "./pages/curriculum";
import Contact from "./pages/contactus";

// Admin pages
import Dashboard from "./pages/admin/dashboard";
import AdminHome from "./pages/admin/home";
import AdminAchievements from "./pages/admin/achievements";
import AdminGallery from "./pages/admin/gallery";
import AdminVideos from "./pages/admin/videos";
import AdminAbout from "./pages/admin/about";

import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Routes>

      {/* ✅ LOGIN (OUTSIDE) */}
      <Route path="/login" element={<Login />} />

      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/video" element={<Video />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/contactus" element={<Contact />} />
      </Route>

      {/* Admin Layout (Protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="videos" element={<AdminVideos />} />
       <Route path="about" element={<AdminAbout />} />
      </Route>

    </Routes>
  );
}

export default App;