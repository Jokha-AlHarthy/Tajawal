import { Container, Row, Col, FormGroup, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordValidation } from "../validations/ForgotPasswordValidation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import airplane from "../assests/airplane.png";
import { useTheme } from "@mui/material/styles";
import { FaMoon, FaSun } from "react-icons/fa";

const ForgotPassword = ({ toggleTheme }) => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(ForgotPasswordValidation) });
    const onSubmit = async (data) => {
        try {
            const res = await fetch("https://tajawal.onrender.com/forgotPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: data.email })
            });
            const result = await res.json();
            alert("If this email exists, a reset link will be shown.");
            if (result.resetLink) {
                alert("Reset Link:\n" + result.resetLink);
            }
        } catch (error) {
            alert("Something went wrong");
        }
    };

    return (
        <div
            style={{
                position: "relative",
                minHeight: "100vh",
                background: theme.palette.background.default,
                color: theme.palette.text.primary
            }}
        >
            <img
                src={airplane}
                alt=""
                style={{
                    position: "absolute",
                    right: "5%",
                    bottom: "5%",
                    width: "45vw",
                    maxWidth: "900px",
                    zIndex: 0,
                    pointerEvents: "none",
                    opacity: theme.palette.mode === "dark" ? 0.3 : 1
                }}
            />
            <div
                onClick={toggleTheme}
                style={{
                    position: "absolute",
                    top: "35px",
                    right: "70px",
                    cursor: "pointer",
                    fontSize: "28px",
                    zIndex: 20,
                    color:
                        theme.palette.mode === "light"
                            ? theme.palette.text.primary
                            : theme.palette.secondary.main
                }}
            >
                {theme.palette.mode === "light" ? <FaMoon /> : <FaSun />}
            </div>
            <Container fluid>
                <Row
                    className="justify-content-center align-items-center"
                    style={{ minHeight: "100vh" }}
                >
                    <Col md="6" className="d-flex justify-content-center">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            style={{
                                width: "520px",
                                height: "600px",
                                background: theme.palette.background.paper,
                                padding: "50px 40px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                zIndex: 2,
                                borderRadius: "8px"
                            }}
                        >
                            <h1
                                style={{
                                    textAlign: "center",
                                    fontWeight: "700",
                                    color: theme.palette.text.primary,
                                    marginBottom: "10px"
                                }}
                            >
                                Forgot Password?
                            </h1>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "18px",
                                    color: theme.palette.text.secondary,
                                    marginBottom: "50px",
                                    fontWeight: "bold"
                                }}
                            >
                                Enter your email and we'll send you a reset link
                            </p>
                            <FormGroup>
                                <input
                                    {...register("email", {
                                        value: email,
                                        onChange: (e) => setEmail(e.target.value)
                                    })}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="form-control"
                                    style={{
                                        padding: "12px",
                                        borderRadius: "6px",
                                        border: `1px solid ${theme.palette.divider}`,
                                        fontSize: "15px",
                                        width: "100%",

                                        background:
                                            theme.palette.mode === "dark"
                                                ? "#FFFFFF"
                                                : theme.palette.background.paper,
                                        color:
                                            theme.palette.mode === "dark"
                                                ? "#000"
                                                : theme.palette.text.primary
                                    }}
                                />
                                <p style={{ color: "red" }}>
                                    {errors.email?.message}
                                </p>
                            </FormGroup>
                            <FormGroup className="text-center">
                                <Button
                                    type="submit"
                                    style={{
                                        width: "50%",
                                        padding: "12px",
                                        background: "#F5A623",
                                        border: "none",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        marginTop: "90px",
                                        borderRadius: "0px"
                                    }}
                                >
                                    Send reset link
                                </Button>
                            </FormGroup>
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <p
                                    style={{
                                        fontSize: "15px",
                                        color: theme.palette.text.secondary,
                                        fontWeight: "bold",
                                        marginBottom: "6px"
                                    }}
                                >
                                    Didn’t get the email?
                                </p>

                                <p
                                    onClick={() => console.log("Resend link clicked")}
                                    style={{
                                        fontSize: "15px",
                                        color: theme.palette.text.secondary,
                                        fontWeight: "bold",
                                        textDecoration: "underline"
                                    }}
                                >
                                    Resend reset link
                                </p>
                            </div>

                            <p
                                onClick={() => navigate("/login")}
                                style={{
                                    textAlign: "center",
                                    marginTop: "70px",
                                    fontSize: "17px",
                                    color: theme.palette.text.secondary,
                                    cursor: "pointer",
                                    fontWeight: "700"
                                }}
                            >
                                Back to Log in
                            </p>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgotPassword;
