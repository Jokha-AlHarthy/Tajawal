import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";
import logo from "../assests/logo.png";
import airplane from "../assests/airplane.png";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";

const LandingPage = ({ toggleTheme }) => {
    const navigate = useNavigate();
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const theme = useTheme();

    return (
        <div style={{ background: theme.palette.background.default, minHeight: "100vh" }}>
            
            {(showPrivacy || showTerms) && (
                <div
                    className="side-panel"
                    style={{
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    }}
                >
                    <div
                        className="side-panel-header"
                        style={{
                            color: theme.palette.text.primary,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <h3 style={{ color: theme.palette.text.primary }}>
                            {showPrivacy ? "Privacy Policy" : "Terms"}
                        </h3>

                        <Button
                            onClick={() => {
                                setShowPrivacy(false);
                                setShowTerms(false);
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                color: theme.palette.text.primary,
                                fontWeight: "bold",
                                fontSize: "20px",
                            }}
                        >
                            X
                        </Button>
                    </div>
                    <div
                        className="side-panel-content"
                        style={{ color: theme.palette.text.primary }}
                    >
                        {showPrivacy && (
                            <>
                                <p><strong>1. Introduction</strong></p>
                                <p>
                                    Your privacy is important to us. This Privacy Policy explains how we collect,
                                    use, and protect your information when you use our services. By using our
                                    website or app, you agree to the terms described here.
                                </p>

                                <p><strong>2. Information We Collect</strong></p>
                                <p>We may collect the following information when you use our service:</p>
                                <ul>
                                    <li>Personal Information: Name, email address, phone number, payment details.</li>
                                    <li>Account Details: Login credentials, booking history, saved preferences.</li>
                                    <li>Usage Data: IP address, browser type, device information, interactions with the app.</li>
                                    <li>Location Data: If enabled, we may collect your real-time location to provide better results.</li>
                                </ul>

                                <p><strong>3. How We Use Your Information</strong></p>
                                <p>We use your information to:</p>
                                <ul>
                                    <li>Process bookings and payments.</li>
                                    <li>Provide customer support.</li>
                                    <li>Send confirmations and updates.</li>
                                    <li>Improve and personalize our services.</li>
                                    <li>Comply with legal requirements.</li>
                                </ul>

                                <p><strong>4. Sharing Your Information</strong></p>
                                <p>We do not sell your personal information. We may share your data only with:</p>
                                <ul>
                                    <li>Travel providers (airlines, hotels) to fulfill bookings.</li>
                                    <li>Payment processors for secure transactions.</li>
                                    <li>Legal authorities when required by law.</li>
                                </ul>

                                <p><strong>5. Data Storage & Security</strong></p>
                                <p>
                                    We store your data securely and take steps to protect it from unauthorized
                                    access, alteration, or destruction.
                                </p>

                                <p><strong>6. Your Rights</strong></p>
                                <ul>
                                    <li>Access, correct, or delete your data.</li>
                                    <li>Withdraw consent for processing.</li>
                                    <li>Opt out of marketing communications.</li>
                                </ul>

                                <p><strong>7. Cookies</strong></p>
                                <p>
                                    We use cookies to improve your browsing experience, remember preferences,
                                    and provide relevant offers.
                                </p>

                                <p><strong>8. Changes to This Policy</strong></p>
                                <p>
                                    We may update this policy from time to time. Updates will be posted on this page.
                                </p>
                            </>
                        )}

                        {showTerms && (
                            <>
                                <p><strong>1. Introduction</strong></p>
                                <p>
                                    Welcome to Tajawal. By accessing or using our website or mobile app,
                                    you agree to these Terms & Conditions. If you do not agree, please do not use our services.
                                </p>

                                <p><strong>2. Services Provided</strong></p>
                                <p>
                                    Tajawal allows users to search, compare, and book travel services including
                                    flights, hotels, and trip packages through third-party providers.
                                </p>

                                <p><strong>3. User Responsibilities</strong></p>
                                <p>When using Tajawal, you agree to:</p>
                                <ul>
                                    <li>Provide accurate and truthful information during booking.</li>
                                    <li>Ensure you meet all travel requirements (passport, visa, vaccinations).</li>
                                    <li>Use the service for personal, non-commercial purposes only.</li>
                                    <li>Not engage in fraudulent or harmful activity on our platform.</li>
                                </ul>

                                <p><strong>4. Booking & Payment</strong></p>
                                <ul>
                                    <li>Prices may change until the booking is confirmed.</li>
                                    <li>Bookings are confirmed only after payment is received.</li>
                                    <li>All payments are securely processed through trusted gateways.</li>
                                </ul>

                                <p><strong>5. Cancellations & Refunds</strong></p>
                                <ul>
                                    <li>Cancellations and refunds depend on the provider (airline, hotel, etc.).</li>
                                    <li>Tajawal is not responsible for refund decisions from third-party providers.</li>
                                    <li>Some bookings may be non-refundable.</li>
                                </ul>

                                <p><strong>6. Liability Disclaimer</strong></p>
                                <p>
                                    Tajawal acts as an intermediary between you and travel service providers.
                                    We are not responsible for delays, cancellations, or service problems caused by providers.
                                    Travel is undertaken at your own risk.
                                </p>

                                <p><strong>7. Intellectual Property</strong></p>
                                <p>
                                    All content, trademarks, and logos on Tajawal are owned by us or our partners
                                    and may not be used without permission.
                                </p>

                                <p><strong>8. Privacy Policy</strong></p>
                                <p>
                                    Your use of Tajawal is also governed by our Privacy Policy.
                                </p>

                                <p><strong>9. Changes to Terms</strong></p>
                                <p>
                                    We may update these Terms at any time. Continued use of Tajawal
                                    means you accept the updated terms.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div style={{ background: theme.palette.background.paper, width: "100%" }}>
                <Container fluid style={{ padding: "40px" }}>
                    <Row className="align-items-center" style={{ marginBottom: "40px" }}>
                        <Col xs="6" className="d-flex align-items-center" style={{ gap: "20px" }}>
                            <img src={logo} alt="logo" style={{ width: "200px", height: "140px" }} />
                        </Col>
                        <Col xs="6" className="d-flex justify-content-end align-items-center" style={{ gap: "28px" }}>
                            <div
                                onClick={toggleTheme}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "28px",
                                    color:
                                        theme.palette.mode === "light"
                                            ? theme.palette.text.primary
                                            : theme.palette.secondary.main,
                                }}
                            >
                                {theme.palette.mode === "light" ? <FaMoon /> : <FaSun />}
                            </div>
                            <Button
                                onClick={() => {
                                    setShowPrivacy(true);
                                    setShowTerms(false);
                                }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: theme.palette.text.primary,
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                }}
                            >
                                Privacy Policy
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowTerms(true);
                                    setShowPrivacy(false);
                                }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: theme.palette.text.primary,
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                }}
                            >
                                Terms
                            </Button>
                        </Col>
                    </Row>
                    <Row className="align-items-center" style={{ minHeight: "70vh" }}>
                        <Col md="6" className="d-flex flex-column justify-content-center" style={{ paddingRight: "40px" }}>
                            <h1
                                style={{
                                    fontSize: "85px",
                                    fontWeight: "700",
                                    marginBottom: "20px",
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Plan your dream <br /> trip in minutes
                            </h1>

                            <p
                                style={{
                                    fontSize: "35px",
                                    color: theme.palette.text.secondary,
                                    marginBottom: "30px",
                                }}
                            >
                                Seamlessly plan and book your <br /> perfect getaway with ease.
                            </p>

                            <div className="d-flex" style={{ gap: "16px" }}>
                                <Button
                                    onClick={() => navigate("/register")}
                                    style={{
                                        padding: "12px 28px",
                                        border: "2px solid #F5A623",
                                        background: "#F5A623",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        borderRadius: "0",
                                        fontSize: "30px",
                                    }}
                                >
                                    Sign Up
                                </Button>

                                <Button
                                    onClick={() => navigate("/login")}
                                    style={{
                                        padding: "12px 28px",
                                        border: "2px solid #F5A623",
                                        background: "#fff",
                                        color: "#ff9b1a",
                                        fontWeight: "bold",
                                        borderRadius: "0",
                                        fontSize: "30px",
                                    }}
                                >
                                    Log In
                                </Button>
                            </div>
                        </Col>
                        <Col md="3" className="d-flex justify-content-start" style={{ paddingLeft: "0" }}>
                            <img
                                src={airplane}
                                alt="airplane"
                                style={{
                                    width: "800px",
                                    height: "900px",
                                    opacity: theme.palette.mode === "dark" ? 0.4 : 1,
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default LandingPage;
