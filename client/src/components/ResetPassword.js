import { Container, Row, Col, FormGroup, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordValidation } from "../validations/ResetPasswordValidation";
import { useState } from "react";
import airplane from "../assests/airplane.png";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(ResetPasswordValidation) });

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`http://localhost:8080/resetPassword/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: data.password })
            });

            const result = await res.json();
            console.log(result);

            if (res.status === 200) {
                alert("Password reset successfully!");
                navigate("/login");
            } else {
                alert(result.message || "Error resetting password");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <div style={{ position: "relative", minHeight: "100vh", background: "#faf7f0" }}>
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
                    pointerEvents: "none"
                }}
            />

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
                                background: "#fff",
                                padding: "50px 40px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                zIndex: 2
                            }}
                        >
                            <h1
                                style={{
                                    textAlign: "center",
                                    fontWeight: "700",
                                    color: "#1A2B49",
                                    marginBottom: "90px"
                                }}
                            >
                                Reset Password
                            </h1>

                            <FormGroup>
                                <input
                                    {...register("password")}
                                    type="password"
                                    placeholder="New password"
                                    className="form-control"
                                    style={{
                                        height: "48px",
                                        borderRadius: "8px",
                                        paddingLeft: "12px",
                                        border: "1px solid #ccc",
                                        fontSize: "15px"
                                    }}
                                />
                                <p style={{ color: "red" }}>{errors.password?.message}</p>
                            </FormGroup>

                            <FormGroup>
                                <input
                                    {...register("confirmPassword")}
                                    type="password"
                                    placeholder="Confirm password"
                                    className="form-control"
                                    style={{
                                        height: "48px",
                                        borderRadius: "8px",
                                        paddingLeft: "12px",
                                        border: "1px solid #ccc",
                                        fontSize: "15px"
                                    }}
                                />
                                <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
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
                                    Reset Password
                                </Button>
                            </FormGroup>

                            <p
                                onClick={() => navigate("/login")}
                                style={{
                                    textAlign: "center",
                                    marginTop: "20px",
                                    fontSize: "17px",
                                    color: "#1A2B49",
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

export default ResetPassword;
