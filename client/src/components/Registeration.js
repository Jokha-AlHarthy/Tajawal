import { FormGroup, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserRegisterValidation } from '../validations/UserRegisterValidation';
import { addUser, resetAuthState } from '../features/UserSlice';
import Logo from '../assests/logo.png';
import airplane from '../assests/airplane.png';
import { FaLock, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";
const Register = ({ toggleTheme }) => {  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const message = useSelector(state => state.users.message);
    const navigate = useNavigate();
    const theme = useTheme();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(UserRegisterValidation)
    });

    const submitData = async () => {
        const data = {
            firstName,
            lastName,
            email,
            dateOfBirth,
            phone,
            password
        };

        const result = await dispatch(addUser(data));
        if (result.meta.requestStatus === "fulfilled") {
            dispatch(resetAuthState());
            navigate("/login");
        }
    };

    return (
        <div style={{ position: "relative", minHeight: "100vh", background: theme.palette.background.default }}>
            <img
                src={Logo}
                alt="Logo"
                style={{
                    position: "absolute",
                    left: "70px",
                    top: "35px",
                    width: "180px",
                    zIndex: 10
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
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "80px",
                    zIndex: 5,
                    position: "relative"
                }}
            >
                <div
                    style={{
                        background: theme.palette.background.paper,
                        padding: "40px",
                        width: "520px",
                        minHeight: "800px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                    }}
                >
                    <h1
                        style={{
                            textAlign: "center",
                            color: theme.palette.text.primary,
                            fontWeight: "bold",
                            marginBottom: "25px"
                        }}
                    >
                        Sign Up
                    </h1>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <FormGroup style={{ flex: 1 }}>
                                <input
                                    {...register("firstName")}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                    style={{
                                        height: "48px",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        width: "100%",
                                        paddingLeft: "10px",
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
                                <p style={{ color: "red" }}>{errors.firstName?.message}</p>
                            </FormGroup>
                            <FormGroup style={{ flex: 1 }}>
                                <input
                                    {...register("lastName")}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last name"
                                    style={{
                                        height: "48px",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        width: "100%",
                                        paddingLeft: "10px",
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
                                <p style={{ color: "red" }}>{errors.lastName?.message}</p>
                            </FormGroup>
                        </div>
                        <br />
                        <FormGroup>
                            <input
                                {...register("email")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                style={{
                                    height: "48px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    width: "100%",
                                    paddingLeft: "10px",
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
                            <p style={{ color: "red" }}>{errors.email?.message}</p>
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <input
                                {...register("dateOfBirth")}
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                type="date"
                                style={{
                                    height: "48px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    width: "100%",
                                    paddingLeft: "10px",
                                    paddingRight: "10px", 
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
                            <p style={{ color: "red" }}>{errors.dateOfBirth?.message}</p>
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <input
                                {...register("phone")}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Contact number"
                                style={{
                                    height: "48px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    width: "100%",
                                    paddingLeft: "10px",
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
                            <p style={{ color: "red" }}>{errors.phone?.message}</p>
                        </FormGroup>
                        <br />
                        <FormGroup style={{ position: "relative" }}>
                            <input
                                {...register("password")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Enter your password"
                                style={{
                                    height: "48px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    width: "100%",
                                    paddingLeft: "10px",
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
                            <FaLock style={{
                                position: "absolute",
                                right: "12px",
                                top: "50%",
                                transform: "translateY(-50%)"
                            }} />
                            <p style={{ color: "red" }}>{errors.password?.message}</p>
                        </FormGroup>
                        <br />
                        <FormGroup style={{ position: "relative" }}>
                            <input
                                {...register("confirmPassword")}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                placeholder="Confirm password"
                                style={{
                                    height: "48px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    width: "100%",
                                    paddingLeft: "10px",
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
                            <FaLock style={{
                                position: "absolute",
                                right: "12px",
                                top: "50%",
                                transform: "translateY(-50%)"
                            }} />
                            <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
                        </FormGroup>
                        <div style={{ textAlign: "right", marginTop: "10px" }}>
                            <a
                                href="/login"
                                style={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: "bold"
                                }}
                            >
                                Already have an account? Log in
                            </a>
                        </div>
                        <br />
                        <div style={{ textAlign: "center", marginTop: "30px" }}>
                            <Button
                                type="submit"
                                style={{
                                    padding: "12px 28px",
                                    border: "2px solid #F5A623",
                                    background: "#fff",
                                    color: "#F5A623",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    borderRadius: "0px"
                                }}
                            >
                                Sign Up
                            </Button>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "10px" }}>
                            <p>{message}</p>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default Register;
