import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { FaCalendarAlt, FaCamera } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/UserSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const ACCENT = "#F4A83F";
const PRIMARY = "#1A2B49";
export default function ProfileSettings() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const loggedUser =
    useSelector((state) => state.users.user) ||
    JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [budget, setBudget] = useState(0);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    airport: "",
  });

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewFile(file);
    setProfilePic(file);
  };

  const handleSave = () => {
    const formData = new FormData();

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("dateOfBirth", user.dateOfBirth);
    formData.append("phone", user.phone);
    formData.append("airport", user.airport);
    formData.append("budget", budget);

    if (newFile) formData.append("profilePic", newFile);
    dispatch(updateUser({ id: loggedUser._id, formData })).then((res) => {
      if (res.payload?.user) {
        localStorage.setItem("user", JSON.stringify(res.payload.user));
      }
    });
  };
  useEffect(() => {
    if (loggedUser) {
      setUser({
        firstName: loggedUser.firstName || "",
        lastName: loggedUser.lastName || "",
        email: loggedUser.email || "",
        dateOfBirth: loggedUser.dateOfBirth
          ? new Date(loggedUser.dateOfBirth).toISOString().substring(0, 10)
          : "",
        phone: loggedUser.phone || "",
        airport: loggedUser.airport || "",
      });
      setBudget(loggedUser.budget || 0);
      if (loggedUser.profilePic?.data) {
        const base64String = btoa(
          new Uint8Array(loggedUser.profilePic.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        setProfilePic(`data:image/jpeg;base64,${base64String}`);
      }
    }
  }, [loggedUser]);
  return (
    <div
      style={{
        background: theme.palette.background.default,
        minHeight: "100vh",
        padding: "40px",
        color: theme.palette.text.primary,
      }}
    >
      <Container>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col md="5" style={{ padding: "20px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
                color: theme.palette.text.primary,
              }}
            >
              Default Budget Range
            </div>

            <input
              type="range"
              min="0"
              max="10000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="profile-range"
              style={{
                "--percent": `${(budget / 10000) * 100}%`,
                width: "100%",
              }}
            />

            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginTop: "5px",
                color: theme.palette.text.primary,
              }}
            >
              OMR {budget}
            </div>

            <div
              style={{
                marginTop: "30px",
                fontSize: "18px",
                fontWeight: "600",
                color: theme.palette.text.primary,
              }}
            >
              Default Home Airport
            </div>

            <div style={{ position: "relative" }}>
              <Input
                type="select"
                value={user.airport}
                onChange={(e) => setUser({ ...user, airport: e.target.value })}
                style={{
                  marginTop: "6px",
                  padding: "12px",
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid ${theme.palette.divider}`,
                  background: isDark ? "#fff" : theme.palette.background.paper,
                  color: isDark ? "#000" : theme.palette.text.primary,
                  appearance: "none",
                }}
              >
                <option value="">Select airport...</option>
                <option value="MCT">MCT – Muscat International Airport</option>
                <option value="SLL">SLL – Salalah International Airport</option>
                <option value="DXB">DXB – Dubai International Airport</option>
                <option value="AUH">AUH – Abu Dhabi International Airport</option>
                <option value="SHJ">SHJ – Sharjah International Airport</option>
                <option value="RKT">RKT – Ras Al Khaimah International Airport</option>
                <option value="DWC">DWC – Al Maktoum International Airport</option>
                <option value="DOH">DOH – Hamad International Airport</option>
                <option value="BAH">BAH – Bahrain International Airport</option>
              </Input>

              <span
                style={{
                  position: "absolute",
                  right: "9px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: "12px",
                  color: isDark ? "#000" : theme.palette.text.primary,
                }}
              >
                ▼
              </span>
            </div>

            <div style={{ display: "flex", gap: "14px", marginTop: "30px" }}>
              <Button
                onClick={handleSave}
                style={{
                  background: isDark ? ACCENT : PRIMARY,
                  border: isDark ? "2px solid " + ACCENT : "none",
                  padding: "10px 28px",
                  fontWeight: "600",
                  borderRadius: "0",
                  color: "#fff",
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => navigate("/planTrip")}
                style={{
                  padding: "10px 28px",
                  fontWeight: "600",
                  borderRadius: "0",
                  background: isDark ? "#fff" : PRIMARY,
                  border: isDark ? `2px solid ${ACCENT}` : "none",
                  color: isDark ? ACCENT : "#fff",
                }}
              >
                Plan your trips
              </Button>
            </div>
          </Col>
          <Col
            md="6"
            style={{
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              padding: "40px",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "120px",
                height: "120px",
                margin: "0 auto",
              }}
            >
              <img
                src={
                  profilePic instanceof File
                    ? URL.createObjectURL(profilePic)
                    : profilePic
                    ? profilePic
                    : "https://via.placeholder.com/120"
                }
                alt="Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  background: theme.palette.background.default,
                }}
              />

              <label
                htmlFor="profileUpload"
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  background: theme.palette.primary.main,
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FaCamera style={{ color: "#fff", fontSize: "16px" }} />
              </label>

              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handlePicChange}
                style={{ display: "none" }}
              />
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "22px",
                color: theme.palette.text.primary,
              }}
            >
              {user.firstName} {user.lastName}
            </div>
            <Row style={{ marginBottom: "14px" }}>
              <Col>
                <Input
                  placeholder="First name"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  style={{
                    padding: "12px",
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                />
              </Col>
              <Col>
                <Input
                  placeholder="Last name"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  style={{
                    padding: "12px",
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                />
              </Col>
            </Row>

            <Input
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              style={{
                padding: "12px",
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                marginBottom: "14px",
              }}
            />

            <div style={{ position: "relative", marginBottom: "14px" }}>
              <Input
                type="date"
                value={user.dateOfBirth}
                onChange={(e) =>
                  setUser({ ...user, dateOfBirth: e.target.value })
                }
                style={{
                  padding: "12px",
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid ${theme.palette.divider}`,
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  width: "100%",
                }}
              />

              <FaCalendarAlt
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: theme.palette.text.secondary,
                }}
              />
            </div>

            <Input
              placeholder="Contact number"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              style={{
                padding: "12px",
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                marginBottom: "14px",
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
