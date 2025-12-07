import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import Register from './components/Registeration.js';
import Login from './components/Login.js';
import UserPorfile from './components/userProfile.js';
import React, { useState } from "react";
import AppNavbar from './components/AppNavbar.js';
import ForgotPassword from "./components/ForgotPassword.js";
import TripForm from "./components/TripForm";
import ResetPassword from './components/ResetPassword.js';
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import AdminAddDestination from './components/AdminAddDestination.js';
import AdminDestinations from './components/AdminDestinations.js';
import AdminEditDestination from './components/AdminEditDestination.js';
import AdminEditUser from './components/AdminEditUser.js';
import AdminNavbar from './components/AdminNavbar.js';
import AdminProfile from './components/AdminProfile.js';
import AdminUsers from './components/AdminUsers.js';

function AppWrapper() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgotPassword" ||
    location.pathname.startsWith("/reset-password") ||
    location.pathname.startsWith("/admin");

  const [appTheme, setAppTheme] = useState("light");
  const toggleTheme = () => {
    setAppTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={appTheme === "light" ? lightTheme : darkTheme}>
      <>
        {!hideNavbar && (
          <AppNavbar theme={appTheme} toggleTheme={toggleTheme} />
        )}
        {location.pathname.startsWith("/admin") && (
          <AdminNavbar theme={appTheme} toggleTheme={toggleTheme} />
        )}
        <Routes>
          <Route path="/" element={<LandingPage toggleTheme={toggleTheme} />} />
          <Route path="/register" element={<Register toggleTheme={toggleTheme} />} />
          <Route path="/login" element={<Login toggleTheme={toggleTheme} />} />
          <Route path="/forgotPassword" element={<ForgotPassword toggleTheme={toggleTheme} />} />
          <Route path="/profile" element={<UserPorfile toggleTheme={toggleTheme} />} />
          <Route path="/planTrip" element={<TripForm toggleTheme={toggleTheme} />} />
          <Route path="/reset-password/:token" element={<ResetPassword toggleTheme={toggleTheme} />} />
          <Route path="/admin/destinations" element={<AdminDestinations toggleTheme={toggleTheme} />} />
          <Route path="/admin/destinations/add" element={<AdminAddDestination toggleTheme={toggleTheme} />} />
          <Route path="/admin/destinations/edit/:id" element={<AdminEditDestination toggleTheme={toggleTheme} />} />
          <Route path="/admin/users" element={<AdminUsers toggleTheme={toggleTheme} />} />
          <Route path="/admin/users/edit/:id" element={<AdminEditUser toggleTheme={toggleTheme} />} />
          <Route path="/admin/profile" element={<AdminProfile toggleTheme={toggleTheme} />} />
        </Routes>
      </>
    </ThemeProvider>

  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
