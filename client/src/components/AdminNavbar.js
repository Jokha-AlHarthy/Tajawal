import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import Logo from "../assests/logo.png";
import { FaGlobe, FaUsersCog, FaUserCircle, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

const AdminNavbar = ({ theme, toggleTheme }) => {
    return (
        <Navbar
            expand="md"
            container={false}
            style={{
                width: "100%",
                backgroundColor: theme === "light" ? "#F5EDD6" : "#1C2B39",
                padding: "15px 40px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                height: "90px",
                marginBottom: "40px",
                borderBottom: "none"  
            }}
        >
            <NavbarBrand>
                <img src={Logo} width="140px" />
            </NavbarBrand>

            <Nav className="ms-auto" navbar>

                <NavItem style={{ marginRight: "25px" }}>
                    <Link
                        to="/admin/destinations"
                        style={{ textDecoration: "none", color: theme === "light" ? "#E38B29" : "#F5A623" }}
                    >
                        <FaGlobe /> Destinations
                    </Link>
                </NavItem>

                <NavItem style={{ marginRight: "25px" }}>
                    <Link
                        to="/admin/users"
                        style={{ textDecoration: "none", color: theme === "light" ? "black" : "#DDE9F7" }}
                    >
                        <FaUsersCog /> Users
                    </Link>
                </NavItem>

                <NavItem style={{ marginRight: "25px" }}>
                    <Link
                        to="/admin/profile"
                        style={{ textDecoration: "none", color: theme === "light" ? "black" : "#DDE9F7" }}
                    >
                        <FaUserCircle /> Profile
                    </Link>
                </NavItem>


                <NavItem>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: theme === "light" ? "black" : "#DDE9F7" }}
                    >
                        <FaSignOutAlt style={{ marginRight: 5 }} /> Logout
                    </Link>
                </NavItem>
                <NavItem style={{ marginRight: "25px", cursor: "pointer" }} onClick={toggleTheme}>
                    {theme === "light"
                        ? <FaMoon style={{ color: "#1C2B39" }} />
                        : <FaSun style={{ color: "#F5A623" }} />
                    }
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default AdminNavbar;
