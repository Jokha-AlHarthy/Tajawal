import React, { useState } from "react";
import { Container, Row, Col, Button, Input, FormGroup } from "reactstrap";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback } from "../features/UserSlice";
import { IoMdArrowDropdown } from "react-icons/io";


export default function Feedback() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const ACCENT = isDark ? "#F4A83F" : "#1C2B39";
  const CARD_BG = isDark ? "#1C2B39" : "#FFFFFF";
  const TEXT_PRIMARY = theme.palette.text.primary;
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async () => {
    if (!user || !user._id) {
      setSuccess("You must be logged in to send feedback.");
      return;
    }

    const data = {
      userId: user._id,
      rating,
      category,
      comments
    };

    const result = await dispatch(submitFeedback(data));
    if (submitFeedback.fulfilled.match(result)) {
      setSuccess("Thank you for your Feedback!");
      setRating(0);
      setCategory("");
      setComments("");
    }
  };

  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "60px 0",
        background: theme.palette.background.default,
        minHeight: "100vh"
      }}
    >
      <Row>
        <Col>
          <div
            style={{
              width: "420px",
              background: CARD_BG,
              padding: "28px",
              borderRadius: "0px",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.06)",
              textAlign: "center",
              color: TEXT_PRIMARY
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 800,
                marginBottom: "6px",
                color: TEXT_PRIMARY
              }}
            >
              We value your opinion
            </h3>

            <p
              style={{
                color: isDark ? "#ccc" : "#777",
                fontSize: "14px",
                marginBottom: "12px"
              }}
            >
              How would you rate the overall experience?
            </p>

            <div style={{ marginBottom: "12px" }}>
              {[1, 2, 3, 4, 5].map(n => (
                <span
                  key={n}
                  onClick={() => setRating(n)}
                  style={{
                    fontSize: "30px",
                    margin: "0 6px",
                    cursor: "pointer",
                    userSelect: "none",
                    color: n <= rating ? ACCENT : isDark ? "#555" : "#ddd"
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <FormGroup style={{ position: "relative" }}>
              <Input
                type="select"
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{
                  padding: "10px 40px 10px 10px",
                  borderRadius: "6px",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(0,0,0,0.1)",
                  background: "#FFFFFF",
                  color: "#666666"
                }}
              >
                <option value="">Category</option>
                <option value="service">Service</option>
                <option value="trip">Trip</option>
                <option value="website">Website</option>
              </Input>
              <IoMdArrowDropdown
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: "22px",
                  color: "#999"
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                placeholder="Comments"
                value={comments}
                onChange={e => setComments(e.target.value)}
                style={{
                  height: "110px",
                  padding: "12px",
                  borderRadius: "6px",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(0,0,0,0.1)",
                  background: "#FFFFFF",
                  color: "#666666",
                  marginBottom: "12px",
                  resize: "none"
                }}
              />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
              <Button
                onClick={handleSubmit}
                style={{
                  background: "#FFFFFF",
                  color: "#F4A83F",
                  padding: "10px 20px",
                  borderRadius: "0px",
                  border: "2px solid #F4A83F",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Submit
              </Button>
            </div>

            {success && (
              <p
                style={{
                  marginTop: "14px",
                  fontWeight: 600,
                  color: isDark ? "#fff" : "#000"
                }}
              >
                {success}
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
