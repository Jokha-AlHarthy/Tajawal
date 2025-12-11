import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { UserLoginValidation } from "../validations/UserLoginValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { getUser } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import airplane from "../assests/airplane.png";
import Logo from "../assests/logo.png";
import { resetAuthState, logout } from "../features/UserSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";
import { setAdmin } from "../features/AdminSlice";


const Login = ({ toggleTheme }) => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const isSuccess = useSelector((state) => state.users.isSuccess);
    const isError = useSelector((state) => state.users.isError);
    const navigate = useNavigate();
    const theme = useTheme();
    const {
        register,
        handleSubmit: submitForm,
        formState: { errors }
    } = useForm({ resolver: yupResolver(UserLoginValidation) });

    const validate = (data) => {
        const adminEmails = ["teamtajawal@gmail.com"];
        if (adminEmails.includes(data.email)) {
            fetch("http://localhost:8080/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(async (res) => {
                    const result = await res.json();

                    if (res.ok && result.admin) {
                        localStorage.setItem("admin", JSON.stringify(result.admin));
                        dispatch(setAdmin(result.admin));
                        navigate("/admin/destinations");
                    } else {
                        alert(result.message || "Admin login failed");
                    }
                })
                .catch(() => alert("Admin login error"));
            return;
        }
        dispatch(getUser(data));
    };

    useEffect(() => {
        dispatch(resetAuthState());
        dispatch(logout());
    }, []);

    useEffect(() => {
        if (isSuccess && user && user.email && !isError) {
            localStorage.setItem("user", JSON.stringify(user));

            const adminEmails = ["teamtajawal@gmail.com"];
            if (adminEmails.includes(user.email)) {
                navigate("/admin");
            } else {
                navigate("/profile");
            }
        }
    }, [user, isSuccess, isError]);
    return (
        <div style={{ position: "relative", minHeight: "100vh", background: theme.palette.background.default }}>
            <div style={{ position: "absolute", left: "70px", top: "35px", display: "flex", alignItems: "center", gap: "20px", zIndex: 5 }}>
                <img src={Logo} alt="" style={{ width: "180px" }} />
            </div>
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
            <Container fluid>
                <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <Col md="6" className="d-flex justify-content-center">
                        <form
                            onSubmit={submitForm(validate)}
                            style={{
                                width: "520px",
                                height: "700px",
                                background: theme.palette.background.paper,
                                padding: "50px 40px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                zIndex: 2
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
                                Log In
                            </h1>

                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "18px",
                                    color: theme.palette.text.secondary,
                                    marginBottom: "80px",
                                    fontWeight: "bold"
                                }}
                            >
                                Log in to access your trips
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
                                        background: theme.palette.mode === "dark" ? "#FFFFFF" : theme.palette.background.paper,
                                        color: theme.palette.mode === "dark" ? "#000000" : theme.palette.text.primary,
                                        fontSize: "15px"
                                    }}

                                />
                                <p style={{ color: "red" }}>{errors.email?.message}</p>
                            </FormGroup>

                            <FormGroup>
                                <input
                                    {...register("password", {
                                        value: password,
                                        onChange: (e) => setPassword(e.target.value)
                                    })}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="form-control"
                                    style={{
                                        padding: "12px",
                                        borderRadius: "6px",
                                        border: `1px solid ${theme.palette.divider}`,
                                        background: theme.palette.mode === "dark" ? "#FFFFFF" : theme.palette.background.paper,
                                        color: theme.palette.mode === "dark" ? "#000000" : theme.palette.text.primary,
                                        fontSize: "15px"
                                    }}

                                />
                                <p style={{ color: "red" }}>{errors.password?.message}</p>
                            </FormGroup>

                            <p
                                onClick={() => navigate("/forgotPassword")}
                                style={{
                                    textAlign: "right",
                                    fontSize: "15px",
                                    color: theme.palette.text.secondary,
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                Forgot Password?
                            </p>

                            <FormGroup className="text-center">
                                <Button
                                    type="submit"
                                    style={{
                                        width: "30%",
                                        padding: "12px",
                                        background: "#fff",
                                        border: "2px solid #F5A623",
                                        color: "#F5A623",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        marginTop: "60px",
                                        borderRadius: "0"
                                    }}
                                >
                                    Log In
                                </Button>
                            </FormGroup>

                            <FormGroup className="text-center">
                                <p
                                    onClick={() => navigate("/register")}
                                    style={{
                                        textAlign: "center",
                                        marginTop: "30px",
                                        fontSize: "15px",
                                        color: theme.palette.text.secondary,
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Create a new account
                                </p>
                            </FormGroup>

                            {isError && (
                                <p style={{ color: "red", textAlign: "center" }}>
                                    Invalid email or password
                                </p>
                            )}
                        </form>
                        <div
                            onClick={toggleTheme}
                            style={{
                                position: "absolute",
                                top: "35px",
                                right: "70px",
                                cursor: "pointer",
                                fontSize: "28px",
                                zIndex: 10,
                                color:
                                    theme.palette.mode === "light"
                                        ? theme.palette.text.primary
                                        : theme.palette.secondary.main
                            }}
                        >
                            {theme.palette.mode === "light" ? <FaMoon /> : <FaSun />}
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
