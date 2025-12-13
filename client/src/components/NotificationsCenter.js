import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchNotifications,markReadInDB,deleteNotificationFromDB} from "../features/NotificationSlice";
import { useTheme } from "@mui/material/styles";
import { Container, Row, Col, Button } from "reactstrap";

export default function NotificationsCenter() {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.users.user);
  const notifications = useSelector(state => state.notifications.list);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  useEffect(() => {
    if (loggedUser?._id) {
      dispatch(fetchNotifications(loggedUser._id));
    }
  }, [loggedUser, dispatch]);

  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 0 80px",
        background: theme.palette.background.default,
        minHeight: "100vh"
      }}
    >
      <Row className="justify-content-center w-100">
        <Col md="10" lg="9">
          <div
            style={{
              background: theme.palette.background.paper,
              padding: "40px",
              borderRadius: "0px",
              boxShadow: isDark
                ? "0 4px 18px rgba(0,0,0,0.4)"
                : "0 4px 18px rgba(0,0,0,0.08)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #eaeaea"
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: 800,
                marginBottom: "32px",
                color: theme.palette.text.primary
              }}
            >
              Notifications Center
            </h2>

            {notifications.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  opacity: 0.7,
                  color: theme.palette.text.primary
                }}
              >
                No notifications yet.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
                {notifications.map(n => (
                  <div
                    key={n._id}
                    style={{
                      background: isDark ? "#FFFFFF" : "#f7f7f7",
                      padding: "22px 28px",
                      borderRadius: "0px",
                      boxShadow: isDark
                        ? "0 2px 8px rgba(0,0,0,0.4)"
                        : "0 2px 8px rgba(0,0,0,0.10)"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px"
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "#1A2B49"
                          }}
                        >
                          {n.title}
                        </h3>

                        <p
                          style={{
                            margin: "6px 0",
                            fontSize: "14px",
                            color: "#555",
                            fontWeight: 500
                          }}
                        >
                          {new Date(n.time).toLocaleString()}
                        </p>

                        <p
                          style={{
                            margin: 0,
                            fontSize: "16px",
                            color: isDark ? "#1A2B49" : "#333",
                            lineHeight: 1.6
                          }}
                        >
                          {n.message}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center"
                        }}
                      >
                        <Button
                          onClick={() => dispatch(markReadInDB(n._id))}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "0px",
                            border: "none",
                            fontSize: "14px",
                            fontWeight: 600,
                            background: isDark ? "#F4A83F" : "#1A2B49",
                            color: "#fff",
                            opacity: n.read ? 0.5 : 1
                          }}
                        >
                          {n.read ? "Read" : "Mark as read"}
                        </Button>
                        <Button
                          onClick={() => {
                            if (n.title === "Profile Updated") {
                              window.location.href = "/profile";
                            } else {
                              window.location.href = "/myTrips";
                            }
                          }}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "0px",
                            border: isDark ? "2px solid #F4A83F" : "none",
                            fontSize: "14px",
                            fontWeight: 600,
                            background: isDark ? "#FFFFFF" : "#F4A83F",
                            color: isDark ? "#F4A83F" : "#fff"
                          }}
                        >
                          {n.title === "Profile Updated"
                            ? "View Profile"
                            : "View Trip"}
                        </Button>
                        <Button
                          onClick={() =>
                            dispatch(deleteNotificationFromDB(n._id))
                          }
                          style={{
                            padding: "10px 16px",
                            borderRadius: "0px",
                            border: "none",
                            fontSize: "14px",
                            fontWeight: 600,
                            background: "#F86F75",
                            color: "#fff"
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
