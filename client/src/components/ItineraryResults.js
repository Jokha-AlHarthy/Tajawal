import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSuitcaseRolling } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdShare, MdSave } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { addNotificationToDB } from "../features/NotificationSlice";
import { Container, Row, Col, Button } from "reactstrap";

export default function ItineraryResults() {
  const savedTrip = useSelector(s => s.trips?.trip);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [trip, setTrip] = useState(
    state?.trip ||
    state?.tripData ||
    savedTrip ||
    JSON.parse(localStorage.getItem("lastTrip")) ||
    null
  );
  const [showMap, setShowMap] = useState(true);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [shake, setShake] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const loggedUser = useSelector(state => state.users.user);
  const selectedDays = [...new Set(selectedActivities.map(a => a.day))];
  const dayTitle =
    selectedDays.length === 1
      ? `Day ${selectedDays[0]}`
      : `Days ${selectedDays.join(" & ")}`;

  useEffect(() => {
    const updated = JSON.parse(localStorage.getItem("lastTrip"));
    if (updated && updated._id === trip?._id) {
      setTrip(updated);
    }
  }, [trip?._id]);

  if (!trip) {
    return (
      <div style={{ textAlign: "center", marginTop: "60px", fontSize: "20px" }}>
        No trip data found.
      </div>
    );
  }

  const {destination,startDate,endDate,travelers,interests,budget,lat,lng,activities} = trip;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.max(
    1,
    Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
  );
  const countryPlans = {
    Oman: {
      Beach: [
        { a: "Morning at Qurum Beach", t: "9:00 AM" },
        { a: "Lunch at Al Mouj Marina", t: "1:00 PM" },
        { a: "Evening at Yiti Beach", t: "6:30 PM" }
      ],
      Food: [
        { a: "Traditional breakfast at Kiblah Café", t: "9:00 AM" },
        { a: "Lunch at Bait Al Luban", t: "1:30 PM" },
        { a: "Coffee at Al Mouj", t: "7:00 PM" }
      ],
      Nature: [
        { a: "Wadi Shab Hike", t: "8:00 AM" },
        { a: "Bimmah Sinkhole Swim", t: "12:30 PM" },
        { a: "Drive to Jebel Akhdar Viewpoint", t: "5:30 PM" }
      ],
      Relaxation: [
        { a: "Spa at Al Bustan Palace", t: "10:00 AM" },
        { a: "Sunset at Shangri-La", t: "6:00 PM" },
        { a: "Quiet Tea at Jebel Sifah", t: "8:00 PM" }
      ],
      History: [
        { a: "Sultan Qaboos Grand Mosque", t: "9:00 AM" },
        { a: "Muttrah Souq + Old Fort", t: "1:00 PM" },
        { a: "National Museum of Oman", t: "4:00 PM" }
      ],
      Shopping: [
        { a: "Muscat Grand Mall", t: "11:00 AM" },
        { a: "Muttrah Souq Walk", t: "3:00 PM" },
        { a: "The Avenues Mall", t: "7:00 PM" }
      ],
      Entertainment: [
        { a: "Royal Opera House Tour", t: "12:00 PM" },
        { a: "Muscat Coastline Boat Cruise", t: "5:00 PM" },
        { a: "Open Air Cinema at Al Mouj", t: "8:00 PM" }
      ]
    },

    "United Arab Emirates": {
      Beach: [
        { a: "JBR Beach Swim", t: "10:00 AM" },
        { a: "Lunch at La Mer", t: "1:00 PM" },
        { a: "Dubai Marina Yacht Cruise", t: "6:30 PM" }
      ],
      Food: [
        { a: "Breakfast at Arabian Tea House", t: "9:00 AM" },
        { a: "Global Village Food Tour", t: "2:00 PM" },
        { a: "Fine Dining at Burj Al Arab", t: "8:00 PM" }
      ],
      Nature: [
        { a: "Dubai Desert Safari", t: "8:00 AM" },
        { a: "Hatta Dam Kayaking", t: "1:00 PM" },
        { a: "Corniche Sunset Walk", t: "6:15 PM" }
      ],
      Relaxation: [
        { a: "Talise Spa at Madinat Jumeirah", t: "11:00 AM" },
        { a: "Saadiyat Private Beach", t: "3:00 PM" },
        { a: "Palm Jumeirah Sunset", t: "6:20 PM" }
      ],
      History: [
        { a: "Sheikh Zayed Grand Mosque", t: "10:00 AM" },
        { a: "Al Fahidi Historic District", t: "2:00 PM" },
        { a: "Louvre Abu Dhabi", t: "5:00 PM" }
      ],
      Shopping: [
        { a: "Dubai Mall", t: "12:00 PM" },
        { a: "Mall of Emirates", t: "3:30 PM" },
        { a: "Souk Madinat Jumeirah", t: "8:00 PM" }
      ],
      Entertainment: [
        { a: "Dubai Fountain Show", t: "7:00 PM" },
        { a: "IMG Worlds of Adventure", t: "2:00 PM" },
        { a: "Yas Marina Nightlife", t: "9:00 PM" }
      ]
    },

    Qatar: {
      Beach: [
        { a: "Katara Beach", t: "10:00 AM" },
        { a: "Banana Island Excursion", t: "2:00 PM" },
        { a: "Doha Corniche Sunset", t: "6:00 PM" }
      ],
      Food: [
        { a: "Msheireb Breakfast", t: "9:30 AM" },
        { a: "Souq Waqif Lunch", t: "1:00 PM" },
        { a: "Qatari Dinner Tasting", t: "7:00 PM" }
      ],
      Nature: [
        { a: "Al Thakira Mangroves Kayaking", t: "8:00 AM" },
        { a: "Sealine Desert Sunset", t: "5:00 PM" },
        { a: "Aspire Park Walk", t: "7:30 PM" }
      ],
      Relaxation: [
        { a: "Banana Island Spa", t: "11:00 AM" },
        { a: "Pearl Marina Walk", t: "5:30 PM" },
        { a: "Sheraton Tea Lounge", t: "8:00 PM" }
      ],
      History: [
        { a: "National Museum of Qatar", t: "10:00 AM" },
        { a: "Souq Waqif Cultural Tour", t: "2:00 PM" },
        { a: "Katara Art Village", t: "6:00 PM" }
      ],
      Shopping: [
        { a: "Villaggio Mall", t: "12:00 PM" },
        { a: "Place Vendôme", t: "3:00 PM" },
        { a: "Msheireb Boutique Shops", t: "7:00 PM" }
      ],
      Entertainment: [
        { a: "Corniche Events", t: "6:00 PM" },
        { a: "The Pearl Cinema", t: "9:00 PM" },
        { a: "Katara Amphitheatre", t: "8:30 PM" }
      ]
    },

    "Saudi Arabia": {
      Beach: [
        { a: "Jeddah Corniche Walk", t: "9:00 AM" },
        { a: "Obhur Waterfront Lunch", t: "1:00 PM" },
        { a: "Half Moon Bay Sunset", t: "5:45 PM" }
      ],
      Food: [
        { a: "Najd Village Breakfast", t: "9:00 AM" },
        { a: "Al Balad Street Food", t: "1:00 PM" },
        { a: "Boulevard Riyadh Café", t: "8:00 PM" }
      ],
      Nature: [
        { a: "Edge of the World Adventure", t: "7:00 AM" },
        { a: "Wadi Lajab Hike", t: "1:30 PM" },
        { a: "Al Wahbah Crater View", t: "5:00 PM" }
      ],
      Relaxation: [
        { a: "Ritz-Carlton Spa", t: "11:00 AM" },
        { a: "Jeddah Corniche Sunset", t: "6:00 PM" },
        { a: "Quiet Café at The Zone", t: "8:00 PM" }
      ],
      History: [
        { a: "Historic Al Balad Tour", t: "10:00 AM" },
        { a: "Masmak Fortress", t: "2:00 PM" },
        { a: "Diriyah UNESCO Visit", t: "5:00 PM" }
      ],
      Shopping: [
        { a: "Red Sea Mall", t: "1:00 PM" },
        { a: "Kingdom Centre Mall", t: "4:00 PM" },
        { a: "Souq Al Zal", t: "7:00 PM" }
      ],
      Entertainment: [
        { a: "Boulevard Riyadh City", t: "7:00 PM" },
        { a: "Jeddah Concerts", t: "9:00 PM" },
        { a: "VOX Cinema Night", t: "10:00 PM" }
      ]
    },

    Kuwait: {
      Beach: [
        { a: "Messilah Beach Walk", t: "9:00 AM" },
        { a: "Lunch at Marina Crescent", t: "1:00 PM" },
        { a: "Al Kout Sunset", t: "6:30 PM" }
      ],
      Food: [
        { a: "Traditional Kuwaiti Breakfast", t: "9:00 AM" },
        { a: "Seafood by Kuwait Towers", t: "1:30 PM" },
        { a: "Coffee at Marina Crescent", t: "7:00 PM" }
      ],
      Nature: [
        { a: "Al Shaheed Park Walk", t: "10:00 AM" },
        { a: "Jahra Reserve Birdwatching", t: "3:00 PM" },
        { a: "Green Island Walk", t: "6:00 PM" }
      ],
      Relaxation: [
        { a: "Spa at Palms Beach Resort", t: "11:00 AM" },
        { a: "Kuwait Towers Sunset", t: "6:00 PM" },
        { a: "Quiet Beach Evening at Messilah", t: "8:00 PM" }
      ],
      History: [
        { a: "Kuwait National Museum", t: "10:00 AM" },
        { a: "Heritage Village Tour", t: "2:00 PM" },
        { a: "Failaka Island Visit", t: "5:00 PM" }
      ],
      Shopping: [
        { a: "Avenues Mall", t: "12:00 PM" },
        { a: "Souq Al Mubarakiyah", t: "3:00 PM" },
        { a: "360 Mall", t: "7:00 PM" }
      ],
      Entertainment: [
        { a: "Opera House Show", t: "6:00 PM" },
        { a: "Marina Mall Cinema", t: "9:00 PM" },
        { a: "Boat Ride", t: "8:00 PM" }
      ]
    },

    Bahrain: {
      Beach: [
        { a: "Marassi Beach Day", t: "10:00 AM" },
        { a: "Snorkeling at Amwaj Islands", t: "2:00 PM" },
        { a: "Sunset at Durrat Al Bahrain", t: "6:00 PM" }
      ],
      Food: [
        { a: "Traditional Bahraini Breakfast", t: "9:00 AM" },
        { a: "Lunch at Block 338", t: "1:00 PM" },
        { a: "Coffee at Adliya", t: "7:00 PM" }
      ],
      Nature: [
        { a: "Al Areen Wildlife Park", t: "10:00 AM" },
        { a: "Coastal Boat Ride", t: "2:30 PM" },
        { a: "Cycling at Bahrain Bay", t: "6:00 PM" }
      ],
      Relaxation: [
        { a: "Four Seasons Spa", t: "11:00 AM" },
        { a: "Ritz-Carlton Beach Relaxation", t: "4:00 PM" },
        { a: "Tea at Luxury Lounge", t: "8:00 PM" }
      ],
      History: [
        { a: "Bahrain Fort", t: "10:00 AM" },
        { a: "National Museum Tour", t: "2:00 PM" },
        { a: "Qal’at al-Bahrain Site", t: "5:00 PM" }
      ],
      Shopping: [
        { a: "City Centre Bahrain", t: "12:00 PM" },
        { a: "The Avenues Mall", t: "3:00 PM" },
        { a: "Souq Bab Al Bahrain", t: "7:00 PM" }
      ],
      Entertainment: [
        { a: "Block 338 Nightlife", t: "8:00 PM" },
        { a: "Marassi Waterfront Event", t: "6:00 PM" },
        { a: "Bahrain Bay Music Evening", t: "9:00 PM" }
      ]
    }
  };

  const hasSaved = activities?.length > 0;
  const generated = Array.from({ length: diffDays }, (_, i) => {
    const acts = interests.flatMap(interest => {
      const list = countryPlans[destination]?.[interest];
      if (!list) return [];
      return [list[i % list.length]];
    });
    return {
      day: i + 1,
      items: acts.map(a => `${a.a} - ${a.t}`)
    };
  });

  const mixedDays =
    Array.isArray(trip.activities) && trip.activities.length > 0
      ? trip.activities
      : generated;
  const handleShare = () => window.print();
  const handleDelete = async () => {
  if (!trip?._id) return;
  if (!window.confirm("Delete this trip permanently?")) return;

  const res = await fetch(
    `http://localhost:8080/trip/delete/${trip._id}`,
    { method: "DELETE" }
  );

  if (res.ok) {
    localStorage.removeItem("lastTrip");
    alert("Trip deleted successfully!");
    navigate("/planTrip", { replace: true }); 
  } else {
    alert("Delete failed");
  }
};
  const saveGeneratedItinerary = async () => {
    const res = await fetch(
      `http://localhost:8080/trip/updateActivities/${trip._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activities: mixedDays })
      }
    );

    if (res.ok) {
      dispatch(
        addNotificationToDB({
          userId: loggedUser._id,
          title: "Trip Saved",
          message: `Your trip to ${destination} was saved successfully.`,
          time: new Date(),
          read: false
        })
      );
      alert("Itinerary saved!");
    }
  };

  return (
    <Container fluid style={{ padding: 0 }}>
      <Row className="justify-content-center">
        <Col>
          <div style={{display: "flex",justifyContent: "center",padding: "40px 0",background: isDark ? "#0D1B2A" : "#FAF3E7" }}>
            <div
              style={{
                width: "92%",
                maxWidth: "950px",
                background: isDark ? "#1B263B" : "#fff",
                padding: "40px 50px",
                borderRadius: "0px",
                boxShadow: "0 3px 15px rgba(0,0,0,0.2)",
                color: isDark ? "#fff" : "#000"
              }}
            >
              <h2 style={{ textAlign: "center", fontSize: "30px", fontWeight: 800 }}>
                <FaSuitcaseRolling size={32} color={isDark ? "#ffffffff" : "#1A2B49"} /> Your Trip to {destination}
              </h2>
              <p style={{ textAlign: "center", color: isDark ? "#ccc" : "#555", fontWeight: "bold" }}>
                {startDate} – {endDate} • {travelers} Travellers
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <label style={{ fontSize: "14px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={showMap}
                    onChange={() => setShowMap(!showMap)}
                    style={{ marginRight: "6px" }}
                  />
                  Show Map
                </label>
              </div>
              {showMap && trip.lat && trip.lng && (
                <iframe
                  title="map-preview"
                  width="100%"
                  height="280"
                  style={{ borderRadius: "10px", marginBottom: "25px" }}
                  src={`https://maps.google.com/maps?q=${trip.lat},${trip.lng}&z=11&hl=en&output=embed`}
                />
              )}
              {mixedDays.map((day) => (
                <div
                  style={{
                    background: isDark ? "#243447" : "#f3f3f3",
                    padding: "18px 22px",
                    borderRadius: "0px",
                    border: `1px solid ${isDark ? "#3A4A60" : "#ddd"}`,
                    marginBottom: "18px",
                    color: isDark ? "#fff" : "#000"
                  }}

                >
                  <h3 style={{ fontWeight: 700, marginBottom: "12px" }}>Day {day.day}</h3>
                  {day.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                        fontSize: "15px"
                      }}

                    >
                      <div>
                        <input
                          type="checkbox"
                          checked={selectedActivities.some(
                            a => a.day === day.day && a.text === item
                          )}
                          onChange={() => {
                            setSelectedActivities(prev => {
                              const exists = prev.some(
                                a => a.day === day.day && a.text === item
                              );
                              if (exists) {
                                return prev.filter(
                                  a => !(a.day === day.day && a.text === item)
                                );
                              }
                              return [...prev, { day: day.day, text: item }];
                            });
                          }}
                          style={{ marginRight: "10px" }}
                        />
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div
                style={{
                  background: isDark ? "#243447" : "#f3f3f3",
                  padding: "16px",
                  borderRadius: "0px",
                  border: `1px solid ${isDark ? "#3A4A60" : "#ddd"}`,
                  fontWeight: 600,
                  marginBottom: "20px",
                  color: isDark ? "#fff" : "#000"
                }}
              >
                Total Budget: OMR {budget}

              </div>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  transform: shake ? "translateX(-6px)" : "translateX(0)",
                  transition: "transform 0.1s",
                }}
                onClick={() => {
                  if (selectedActivities.length === 0) {
                    setShake(true);
                    setTimeout(() => setShake(false), 300);
                  }
                }}
              >
                <button
                  disabled={selectedActivities.length === 0}
                  onClick={() =>
                    navigate("/edit-itinerary", {
                      state: {
                        trip,
                        selectedActivities,
                        dayTitle,
                        allDays: mixedDays,
                        editedDay: selectedDays[0]
                      }
                    })
                  }

                  style={{
                    padding: "12px 22px",
                    background:
                      selectedActivities.length === 0 ? "#A0A0A0" : "#1D3557",
                    color: "#fff",
                    borderRadius: "0px",
                    border: "none",
                    cursor:
                      selectedActivities.length === 0 ? "not-allowed" : "pointer",
                    opacity: selectedActivities.length === 0 ? 0.6 : 1,
                    transition: "all 0.2s ease"
                  }}
                >
                  <LiaEdit /> Edit Itinerary
                </button>
                <button
                  onClick={saveGeneratedItinerary}
                  style={{
                    padding: "12px 22px",
                    background: "#198754",
                    color: "#fff",
                    borderRadius: "0px",
                    border: "none"
                  }}
                >
                  <MdSave /> Save Trip
                </button>
                <button
                  onClick={handleShare}
                  style={{
                    padding: "12px 22px",
                    background: "#F5A623",
                    color: "#fff",
                    borderRadius: "0px",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "600"
                  }}
                >
                  <MdShare /> Share
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  style={{
                    padding: "12px 22px",
                    background: "#F47984",
                    color: "#fff",
                    borderRadius: "0px",
                    border: "none"
                  }}
                >
                  <RiDeleteBin5Line /> Delete Trip
                </button>
              </div>
            </div>
          </div >
        </Col>
      </Row>
    </Container>
  );
}
