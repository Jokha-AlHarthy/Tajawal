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

function AppWrapper() {
  const location = useLocation();
  
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgotPassword" ||
    location.pathname.startsWith("/reset-password");

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

        <Routes>
          <Route path="/" element={<LandingPage toggleTheme={toggleTheme}/>} />
          <Route path="/register" element={<Register toggleTheme={toggleTheme}/>} />
          <Route path="/login" element={<Login  toggleTheme={toggleTheme}/>} />
          <Route path="/forgotPassword" element={<ForgotPassword toggleTheme={toggleTheme}/>} />
          <Route path="/profile" element={<UserPorfile />} />
          <Route path="/planTrip" element={<TripForm toggleTheme={toggleTheme}/>} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
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
