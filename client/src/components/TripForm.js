import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Label, FormGroup, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiMinus, FiPlus } from "react-icons/fi";
import { MdFastfood, MdNaturePeople, MdMuseum } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { FaShoppingBasket } from "react-icons/fa";
import { TbMassage } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { createTrip } from "../features/TripSlice";
import { useTheme } from "@mui/material/styles";

const ACCENT = "#F4A83F";
const PRIMARY = "#1A2B49";
const ERROR_RED = "#EF4444";
const GCC_COUNTRIES = [
  { name: "United Arab Emirates", flag: "🇦🇪", lat: 25.276987, lng: 55.296249 },
  { name: "Saudi Arabia", flag: "🇸🇦", lat: 24.713552, lng: 46.675297 },
  { name: "Qatar", flag: "🇶🇦", lat: 25.354826, lng: 51.183884 },
  { name: "Kuwait", flag: "🇰🇼", lat: 29.375859, lng: 47.977405 },
  { name: "Bahrain", flag: "🇧🇭", lat: 26.0667, lng: 50.5577 },
  { name: "Oman", flag: "🇴🇲", lat: 23.588, lng: 58.3829 }
];

export default function TripForm() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.users.user);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const ORANGE = "#F4A83F";
  const [tripData, setTripData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: 2500,
    travelers: 3,
    interests: []
  });

  const [countryOpen, setCountryOpen] = useState(false);
  const [countryFilter, setCountryFilter] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const countryBoxRef = useRef(null);

  useEffect(() => {
    function close(e) {
      if (countryBoxRef.current && !countryBoxRef.current.contains(e.target)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const valid =
    tripData.destination &&
    tripData.startDate &&
    tripData.endDate &&
    new Date(tripData.endDate) >= new Date(tripData.startDate) &&
    tripData.budget > 0 &&
    tripData.interests.length > 0;

  const handleTripSubmit = async () => {
    if (!tripData.destination) return alert("Please enter a destination.");
    if (!loggedUser || !loggedUser._id) return alert("You must be logged in to create a trip.");

    const finalTrip = { ...tripData, userId: loggedUser._id };
    const result = await dispatch(createTrip(finalTrip));

    if (result.meta.requestStatus === "fulfilled") {
      nav("/itinerary/1", { state: { tripData } });
    }
  };

  return (
    <div style={{ background: theme.palette.background.default, minHeight: "100vh", paddingTop: "40px" }}>
      <div style={{ maxWidth: "520px", margin: "0 auto" }}>
        <Card style={{ padding: "20px", border: "none", boxShadow: "none", background: theme.palette.background.paper }}>
          <CardBody>
            <h3 style={{ textAlign: "center", marginBottom: "25px", fontWeight: 600, color: theme.palette.text.primary }}>
              Plan Your Trip
            </h3>

            <div ref={countryBoxRef} style={{ marginBottom: "20px" }}>
              <Label style={{ color: theme.palette.text.primary }}>Where do you want to go?</Label>

              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
                onClick={() => setCountryOpen(true)}
              >
                <FiMapPin size={20} color="#777" />

                <Input
                  type="text"
                  placeholder="e.g., Muscat, Oman"
                  value={tripData.destination}
                  onChange={(e) => {
                    setTripData({ ...tripData, destination: e.target.value });
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none"
                  }}
                />
              </div>

              {lat && lng && (
                <div style={{ marginTop: "10px" }}>
                  <iframe
                    title="map-preview"
                    width="100%"
                    height="200"
                    style={{ borderRadius: "10px" }}
                    src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es;&output=embed`}
                  />
                </div>
              )}

              {countryOpen && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    background: "#fff",
                    borderRadius: "8px",
                    marginTop: "5px",
                    padding: "10px",
                    maxHeight: "200px",
                    overflowY: "auto"
                  }}
                >
                  <Input
                    placeholder="Search..."
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />

                  {GCC_COUNTRIES.filter((c) =>
                    c.name.toLowerCase().includes(countryFilter.toLowerCase())
                  ).map((c) => (
                    <div
                      key={c.name}
                      onClick={() => {
                        setTripData({ ...tripData, destination: c.name });
                        setLat(c.lat);
                        setLng(c.lng);
                        setCountryOpen(false);
                      }}
                      style={{ padding: "8px", cursor: "pointer" }}
                    >
                      {c.flag} {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <FormGroup>
              <Label style={{ color: theme.palette.text.primary }}>When are you travelling?</Label>

              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ width: "100%" }}>
                  <input
                    type="date"
                    value={tripData.startDate}
                    onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px"
                    }}
                  />
                </div>

                <div style={{ width: "100%" }}>
                  <input
                    type="date"
                    value={tripData.endDate}
                    onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px"
                    }}
                  />
                </div>
              </div>

              {tripData.startDate &&
                tripData.endDate &&
                new Date(tripData.endDate) < new Date(tripData.startDate) && (
                  <p style={{ color: "#EF4444", fontSize: "13px" }}>
                    Return date cannot be before departure.
                  </p>
                )}
            </FormGroup>

            <FormGroup style={{ marginTop: "15px" }}>
              <Label style={{ color: theme.palette.text.primary }}>
                What’s your budget? (OMR)
              </Label>

              <input
                type="range"
                min={0}
                max={5000}
                value={tripData.budget}
                onChange={(e) =>
                  setTripData({ ...tripData, budget: Number(e.target.value) })
                }
                style={{
                  width: "100%",
                  WebkitAppearance: "none",
                  height: "8px",
                  borderRadius: "5px",
                  background: `linear-gradient(
                  to right,
                  ${isDark ? ORANGE : PRIMARY} ${(tripData.budget / 5000) * 100}%,
                  ${isDark ? "#3A4A60" : "#e0e0e0"} ${(tripData.budget / 5000) * 100}%
                )`,
                  outline: "none"
                }}
              />

              <style>
                {`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 18px;
                    width: 18px;
                    background: ${isDark ? "#F4A83F" : "#1A2B49"};
                    border-radius: 50%;
                    cursor: pointer;
                    margin-top: 0px;
                  }

                  input[type="range"]::-moz-range-thumb {
                    height: 18px;
                    width: 18px;
                    background: ${isDark ? "#F4A83F" : "#1A2B49"};
                    border-radius: 50%;
                    cursor: pointer;
                  }
                `}
              </style>

              <div
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  marginTop: "8px",
                  color: isDark ? "#fff" : "#000"
                }}
              >
                OMR {tripData.budget}
              </div>
            </FormGroup>
            <FormGroup>
              <Label style={{ color: theme.palette.text.primary }}>
                What are you interested in?
              </Label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px 20px",
                  marginTop: "10px"
                }}
              >
                {[
                  "Beach",
                  "Food",
                  "Nature",
                  "Relaxation",
                  "History",
                  "Shopping",
                  "Entertainment"
                ].map((item, index) => {
                  const icons = [
                    <FaUmbrellaBeach size={20} color={isDark ? ORANGE : undefined} />,
                    <MdFastfood size={20} color={isDark ? ORANGE : undefined} />,
                    <MdNaturePeople size={20} color={isDark ? ORANGE : undefined} />,
                    <TbMassage size={20} color={isDark ? ORANGE : undefined} />,
                    <MdMuseum size={20} color={isDark ? ORANGE : undefined} />,
                    <FaShoppingBasket size={20} color={isDark ? ORANGE : undefined} />,
                    <RiMovie2Fill size={20} color={isDark ? ORANGE : undefined} />
                  ];
                  return (
                    <label
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: isDark ? "#fff" : "#000"
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={tripData.interests.includes(item)}
                        onChange={() => {
                          const list = tripData.interests.includes(item)
                            ? tripData.interests.filter((x) => x !== item)
                            : [...tripData.interests, item];
                          setTripData({ ...tripData, interests: list });
                        }}
                      />
                      {icons[index]}
                      <span style={{ color: isDark ? "#fff" : "#000" }}>{item}</span>
                    </label>
                  );
                })}
              </div>
              {tripData.interests.length === 0 && (
                <p style={{ color: ERROR_RED, fontSize: "13px" }}>
                  Select at least one interest.
                </p>
              )}
            </FormGroup>


            <FormGroup>
              <Label style={{ color: theme.palette.text.primary }}>How many people are travelling?</Label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "30px",
                  marginTop: "5px"
                }}
              >
                <button
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: isDark ? ACCENT : PRIMARY,
                    color: "#fff",
                    border: "none"
                  }}
                  onClick={() =>
                    setTripData({ ...tripData, travelers: Math.max(1, tripData.travelers - 1) })
                  }
                >
                  <FiMinus size={20} />
                </button>

                <strong style={{ fontSize: "22px", color: theme.palette.text.primary }}>
                  {tripData.travelers}
                </strong>

                <button
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: isDark ? ACCENT : PRIMARY,
                    color: "#fff",
                    border: "none"
                  }}
                  onClick={() =>
                    setTripData({ ...tripData, travelers: tripData.travelers + 1 })
                  }
                >
                  <FiPlus size={20} />
                </button>
              </div>
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
              <Button
                style={{
                  width: "45%",
                  padding: "14px 0",
                  borderRadius: "0px",
                  fontWeight: "600",
                  fontSize: "16px",
                  border: "none",
                  background: isDark ? ACCENT : ACCENT,
                  color: "#fff"
                }}
                onClick={() => nav("/profile")}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: "45%",
                  padding: "14px 0",
                  borderRadius: "0px",
                  fontWeight: "600",
                  fontSize: "16px",
                  border: isDark ? `2px solid ${ACCENT}` : "none",
                  background: isDark ? "#fff" : PRIMARY,
                  color: isDark ? ACCENT : "#fff"
                }}
                onClick={handleTripSubmit}
              >
                Generate itinerary
              </Button>

            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
