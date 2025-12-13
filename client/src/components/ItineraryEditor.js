import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { LiaEditSolid } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  FaPlusCircle,
  FaSave,
  FaTimes,
  FaUndoAlt,
  FaGripLines
} from "react-icons/fa";

export default function ItineraryEditor() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const trip = state?.trip;
  const selectedActivities = state?.selectedActivities || [];
  const dayTitle = state?.dayTitle || "Day 1";
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [activities, setActivities] = useState([]);
  const [history, setHistory] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const allDays = state?.allDays || [];
  const editedDay = state?.editedDay;

  useEffect(() => {
    if (!editedDay || !allDays.length) return;

    const dayData = allDays.find(d => d.day === editedDay);
    if (dayData) {
      setActivities(dayData.items.map(text => ({ day: editedDay, text })));
    }
  }, [editedDay, allDays]);

  const saveSnapshot = () => {
    setHistory(prev => [...prev, activities]);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    saveSnapshot();
    const items = Array.from(activities);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setActivities(items);
  };
  const addActivity = () => {
    if (!newActivity.trim()) return;
    saveSnapshot();
    setActivities([...activities, { day: editedDay, text: newActivity.trim() }]);
    setNewActivity("");
  };
  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setActivities(prev);
    setHistory(history.slice(0, -1));
  };
  const saveItinerary = async () => {
    const mergedActivities = allDays.map(day =>
      day.day === editedDay
        ? {
          day: editedDay,
          items: activities.map(a => a.text)
        }
        : day
    );
    const res = await fetch(
      `http://localhost:8080/trip/updateActivities/${trip._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activities: mergedActivities })
      }
    );

    const data = await res.json();
    const updatedTrip = data.trip;
    localStorage.setItem("lastTrip", JSON.stringify(updatedTrip));
    alert("Itinerary saved!");
    navigate(-1);
  };
  return (
    <div
      style={{
        background: isDark ? "#0D1B2A" : "#F6EFE5",
        minHeight: "100vh",
        padding: "50px 0"
      }}
    >
      <Container
        style={{
          maxWidth: "900px",
          background: isDark ? "#1B263B" : "#fff",
          padding: "40px",
          borderRadius: "6px",
          boxShadow: "0 3px 15px rgba(0,0,0,0.15)",
          color: isDark ? "#fff" : "#000"
        }}
      >
        <Row>
          <Col>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center"
              }}
            >
              <LiaEditSolid /> Itinerary Editor
            </h2>

            <p
              style={{
                color: isDark ? "#ccc" : "#666",
                fontSize: "15px",
                marginBottom: "25px",
                textAlign: "center"
              }}
            >
              Edit your selected activities below.
            </p>

            <h4 style={{ fontWeight: 700, marginBottom: "20px" }}>
              {dayTitle}
            </h4>
          </Col>
        </Row>

        <Row>
          <Col>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="activities">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {activities.map((act, idx) => (
                      <Draggable
                        key={`${act.day}-${act.text}-${idx}`}
                        draggableId={`${act.day}-${act.text}-${idx}`}
                        index={idx}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              background: isDark ? "#243447" : "#EDEDED",
                              padding: "12px",
                              borderRadius: "6px",
                              marginBottom: "18px",
                              display: "flex",
                              alignItems: "center",
                              boxShadow: "0 3px 6px rgba(0,0,0,0.20)",
                              ...provided.draggableProps.style
                            }}
                          >
                            <div
                              {...provided.dragHandleProps}
                              style={{
                                fontSize: "20px",
                                cursor: "grab",
                                marginRight: "18px",
                                opacity: 0.7
                              }}
                            >
                              <FaGripLines size={18} />
                            </div>

                            <div
                              style={{
                                background: isDark ? "#1B263B" : "#fff",
                                border: `1px solid ${isDark ? "#3A4A60" : "#ddd"}`,
                                padding: "14px 18px",
                                flex: 1,
                                borderRadius: "6px"
                              }}
                            >
                              <Input
                                value={act.text}
                                readOnly
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  fontSize: "15px",
                                  padding: 0,
                                  color: isDark ? "#fff" : "#000"
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Col>
        </Row>

        <Row style={{ marginTop: "25px", marginBottom: "30px" }}>
          <Col md="9">
            <Input
              placeholder="Add a new activity..."
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              style={{ padding: "12px", fontSize: "15px" }}
            />
          </Col>

          <Col md="3">
            <Button
              onClick={addActivity}
              style={{
                background: isDark ? "#F5A623" : "#1D3557",
                border: "none",
                borderRadius: "0px",
                padding: "12px",
                width: "160px",
                color: "#fff"
              }}
            >
              <FaPlusCircle /> Add
            </Button>
          </Col>
        </Row>

        <Row style={{ justifyContent: "center", gap: "10px" }}>
          <Button
            onClick={saveItinerary}
            style={{
              background: "#2D8A4F",
              border: "none",
              borderRadius: "0px",
              padding: "12px 22px",
              width: "180px",
              fontSize: "16px",
              whiteSpace: "nowrap"
            }}
          >
            <FaSave /> Save Changes
          </Button>

          <Button
            onClick={() => navigate(-1)}
            style={{
              background: "#C0BEBB",
              border: "none",
              borderRadius: "0px",
              padding: "12px 22px",
              width: "180px",
              fontSize: "16px",
              whiteSpace: "nowrap"
            }}
          >
            <FaTimes /> Cancel Changes
          </Button>

          <Button
            onClick={handleUndo}
            style={{
              background: "#F47984",
              border: "none",
              borderRadius: "0px",
              padding: "12px 22px",
              width: "180px",
              fontSize: "16px",
              whiteSpace: "nowrap"
            }}
          >
            <FaUndoAlt /> Undo
          </Button>
        </Row>
      </Container>
    </div>
  );
}

