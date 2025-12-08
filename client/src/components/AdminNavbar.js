// src/components/admin/AdminNavbar.jsx

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../assests/logo.png";
import {
  FaGlobe,
  FaUsersCog,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun
} from "react-icons/fa";

const AdminNavbar = ({ theme, toggleTheme }) => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  // Map routes to menu items
  useEffect(() => {
    const map = {
      "/admin/destinations": "destinations",
      "/admin/users": "users",
      "/admin/profile": "profile",
      "/": "logout"
    };
    setActiveItem(map[location.pathname] || "");
  }, [location.pathname]);

  // Dynamic color based on active item + theme
  const getColor = (item) => {
    if (activeItem === item) {
      return theme === "light" ? "#F5A623" : "#DDE9F7";
    }
    return theme === "light" ? "#1C2B39" : "#F5A623";
  };


  return (
    <div
      style={{
        background: theme === "light" ? "#F5EDD6" : "#1C2B39",
        height: "80px",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      {/* Logo */}
      <img src={Logo} alt="logo" style={{ width: "140px" }} />

      {/* Right side menu */}
      <div style={{ display: "flex", alignItems: "center", gap: "35px" }}>
        <Link
          to="/admin/destinations"
          style={{
            color: getColor("destinations"),
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          <FaGlobe style={{ marginRight: 5 }} /> Destinations
        </Link>

        <Link
          to="/admin/users"
          style={{
            color: getColor("users"),
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          <FaUsersCog style={{ marginRight: 5 }} /> Users
        </Link>

        <Link
          to="/admin/profile"
          style={{
            color: getColor("profile"),
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          <FaUserCircle style={{ marginRight: 5 }} /> Profile
        </Link>

        <Link
          to="/"
          style={{
            color: getColor("logout"),
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          <FaSignOutAlt style={{ marginRight: 5 }} /> Logout
        </Link>

        {/* 🔆 Theme toggle – icon is inside the clickable div */}
        <div
          onClick={toggleTheme}
          style={{
            color: theme === "light" ? "#1C2B39" : "#F5A623",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
