import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../assests/logo.png";
import {FaHome,FaPlaneDeparture,FaBell,FaUser,FaCommentDots,FaSignOutAlt,FaMoon,FaSun} from "react-icons/fa";

const AppNavbar = ({ theme, toggleTheme }) => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  useEffect(() => {
    const map = {
      "/myTrips": "myTrips",
      "/planTrip": "planTrip",
      "/notifications": "notifications",
      "/profile": "profile",
      "/feedback": "feedback",
      "/": "logout"
    };
    setActiveItem(map[location.pathname] || "");
  }, [location.pathname]);

  const getColor = (item) => {
    if (activeItem === item) {
      return theme === "light" ? "#F5A623" : "#DDE9F7";
    }
    return theme === "light" ? "#1C2B39" : "#F5A623";
  };

  return (
    <div
      style={{
        background: theme === "light" ? "#FAF3E7" : "#1C2B39",
        height: "80px",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        justifyContent: "space-between"
      }}
    >
      <img src={Logo} alt="logo" style={{ width: "150px" }} />

      <div style={{ display: "flex", alignItems: "center", gap: "35px" }}>
        <Link
          to="/myTrips"
          style={{ color: getColor("myTrips"), textDecoration: "none" }}
        >
          <FaHome style={{ marginRight: 5 }} /> My Trips
        </Link>

        <Link
          to="/planTrip"
          style={{ color: getColor("planTrip"), textDecoration: "none" }}
        >
          <FaPlaneDeparture style={{ marginRight: 5 }} /> Plan Trip
        </Link>

        <Link
          to="/notifications"
          style={{ color: getColor("notifications"), textDecoration: "none" }}
        >
          <FaBell style={{ marginRight: 5 }} /> Notifications
        </Link>

        <Link
          to="/profile"
          style={{
            color: getColor("profile"),
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          <FaUser style={{ marginRight: 5 }} /> Profile
        </Link>

        <Link
          to="/feedback"
          style={{ color: getColor("feedback"), textDecoration: "none" }}
        >
          <FaCommentDots style={{ marginRight: 5 }} /> Feedback
        </Link>

        <Link
          to="/"
          style={{ color: getColor("logout"), textDecoration: "none" }}
        >
          <FaSignOutAlt style={{ marginRight: 5 }} /> Logout
        </Link>

        <div
          onClick={toggleTheme}
          style={{
            color: theme === "light" ? "#1C2B39" : "#F5A623",
            cursor: "pointer"
          }}
        >
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
