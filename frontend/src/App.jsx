import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Experiences from "./pages/Experiences";
import Destinations from "./pages/Destinations";
import TourDetails from "./pages/TourDetails";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="/tour/:slug" element={<TourDetails />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
