import { Container, Row, Col, FormGroup, Input, Button, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/AdminSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminEditUser = () => {

    const { email } = useParams();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [profilepic, setProfilepic] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/admin/user/${email}`)
            .then(res => {
                const u = res.data;
                setFname(u.fname || "");
                setLname(u.lname || "");
                setDob(u.dob || "");
                setPhone(u.phone || "");
                setProfilepic(u.profilepic || "");
            });
    }, [email]);

    const handleSave = () => {
        const data = {
            email,
            fname,
            lname,
            dob,
            phone,
            profilepic
        };

        dispatch(updateUser(data)).then(res => {
            if (res.payload && res.payload.message === "Success")
                navigate("/admin/users");
        });
    };

    const handleCancel = () => navigate("/admin/users");

    const def_pic =
        "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg";

    return (
        <Container fluid style={{ backgroundColor: "#F5EDD6", minHeight: "100vh" }}>
            <Row className="justify-content-center" style={{ marginTop: "40px" }}>
                <Col md="6">

                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "50px 60px",
                            borderRadius: "12px",
                            boxShadow: "0 0 12px rgba(0,0,0,0.12)",
                        }}
                    >

                        {/* Profile Image */}
                        <div style={{ textAlign: "center", marginBottom: "30px" }}>
                            <img
                                src={profilepic || def_pic}
                                width="130"
                                height="130"
                                style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "3px solid #eee",
                                }}
                                alt="profile"
                            />
                        </div>

                        {/* First + Last Name */}
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <Input
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                        style={{ padding: "14px", fontSize: "16px" }}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md="6">
                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <Input
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                        style={{ padding: "14px", fontSize: "16px" }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* DOB */}
                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                style={{ padding: "14px", fontSize: "16px" }}
                            />
                        </FormGroup>

                        {/* Email */}
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                disabled
                                style={{
                                    padding: "14px",
                                    fontSize: "16px",
                                    backgroundColor: "#f0f0f0",
                                }}
                            />
                        </FormGroup>

                        {/* Phone */}
                        <FormGroup>
                            <Label>Phone</Label>
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ padding: "14px", fontSize: "16px" }}
                            />
                        </FormGroup>

                        {/* Profile URL */}
                        <FormGroup>
                            <Label>Profile Picture URL</Label>
                            <Input
                                value={profilepic}
                                onChange={(e) => setProfilepic(e.target.value)}
                                style={{ padding: "14px", fontSize: "16px" }}
                            />
                        </FormGroup>

                        {/* Buttons */}
                        <div style={{ display: "flex", marginTop: "35px" }}>
                            <Button
                                style={{
                                    backgroundColor: "#C5C4C4",
                                    border: "none",
                                    padding: "10px 30px",
                                    marginRight: "20px",
                                    color: "#333",
                                    fontWeight: "600",
                                }}
                                onClick={handleCancel}
                            >
                                ✖ Cancel Changes
                            </Button>

                            <Button
                                style={{
                                    backgroundColor: "#0C8B4C",
                                    border: "none",
                                    padding: "10px 30px",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                                onClick={handleSave}
                            >
                                💾 Save User
                            </Button>
                        </div>

                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default AdminEditUser;
