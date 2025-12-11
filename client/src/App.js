import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import Register from './components/Registeration.js';
import Login from './components/Login.js';
import UserPorfile from './components/userProfile.js';
import React, { useState, useEffect } from "react";
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
import AdminUsers from './components/AdminUsers.js';
import AdminProfile from './components/AdminProfile.js';
import Feedback from './components/Feedback.js';
import NotificationsCenter from './components/NotificationsCenter.js';
import ItineraryResults from './components/ItineraryResults.js';
import ItineraryEditor from './components/ItineraryEditor';
import { useDispatch } from "react-redux";
import { setUser } from "./features/UserSlice";

function AppWrapper() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      dispatch(setUser(JSON.parse(saved)));
    }
  }, [dispatch]);

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
        {!hideNavbar && <AppNavbar theme={appTheme} toggleTheme={toggleTheme} />}
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
          <Route path="/feedback" element={<Feedback toggleTheme={toggleTheme}/>} />
          <Route path="/notifications" element={<NotificationsCenter toggleTheme={toggleTheme}/>} />
          <Route path="/myTrips" element={<ItineraryResults toggleTheme={toggleTheme}/>} />
          <Route path="/edit-itinerary" element={<ItineraryEditor toggleTheme={toggleTheme}/>} />

          <Route path="/admin/destinations" element={<AdminDestinations toggleTheme={toggleTheme} theme={appTheme}/>} />
          <Route path="/admin/destination/add" element={<AdminAddDestination toggleTheme={toggleTheme} theme={appTheme}/>} />
          <Route path="/admin/destination/edit/:id" element={<AdminEditDestination toggleTheme={toggleTheme} theme={appTheme}/>} />
          <Route path="/admin/users" element={<AdminUsers toggleTheme={toggleTheme} theme={appTheme}/>} />
          <Route path="/admin/user/edit/:email" element={<AdminEditUser toggleTheme={toggleTheme} theme={appTheme}/>} />
          <Route path="/admin/profile" element={<AdminProfile toggleTheme={toggleTheme} theme={appTheme}/>} />
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
