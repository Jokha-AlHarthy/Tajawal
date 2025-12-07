import { Container, Row, Col, FormGroup, Input, Button, Label } from "reactstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminProfile } from "../features/AdminSlice";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = useSelector((state) => state.admin.admin);

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [profilepic, setProfilepic] = useState("");

    useEffect(() => {
        if (admin) {
            setFname(admin.fname || "");
            setLname(admin.lname || "");
            setEmail(admin.email || "");
            setDob(admin.dob || "");
            setPhone(admin.phone || "");
            setProfilepic(admin.profilepic || "");
        }
    }, [admin]);

    const handleSave = () => {
        const data = {
            email,
            fname,
            lname,
            dob,
            phone,
            profilepic
        };

        dispatch(updateAdminProfile(data)).then((res) => {
            if (res.payload && res.payload.message === "Success") {
                navigate("/admin/destinations");
            }
        });
    };

    const handleCancel = () => {
        navigate("/admin/destinations");
    };

    const defaultPic =
        "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

    return (
        <Container fluid style={{ backgroundColor: "#F5EDD6", minHeight: "100vh" }}>
            <Row className="justify-content-center" style={{ marginTop: "40px" }}>
                <Col md="6">
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "50px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            textAlign: "center"
                        }}
                    >
                        {/* Profile Photo */}
                        <img
                            src={profilepic || defaultPic}
                            alt="profile"
                            style={{
                                width: "130px",
                                height: "130px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginBottom: "15px",
                                border: "3px solid #eee"
                            }}
                        />

                        <h3 style={{ fontWeight: "bold", marginBottom: "25px" }}>Admin Profile</h3>

                        {/* Name Row */}
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label style={{ fontWeight: "bold" }}>First Name</Label>
                                    <Input
                                        type="text"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md="6">
                                <FormGroup>
                                    <Label style={{ fontWeight: "bold" }}>Last Name</Label>
                                    <Input
                                        type="text"
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* Email */}
                        <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Email</Label>
                            <Input type="email" value={email} disabled />
                        </FormGroup>

                        {/* DOB */}
                        <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Date of Birth</Label>
                            <Input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </FormGroup>

                        {/* Phone */}
                        <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Phone</Label>
                            <Input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormGroup>

                        {/* Profile Picture URL */}
                        <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Profile Picture URL</Label>
                            <Input
                                type="text"
                                value={profilepic}
                                onChange={(e) => setProfilepic(e.target.value)}
                            />
                        </FormGroup>

                        {/* Buttons */}
                        <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
                            <Button
                                style={{
                                    backgroundColor: "#C0C0C0",
                                    border: "none",
                                    padding: "10px 25px",
                                    marginRight: "20px"
                                }}
                                onClick={handleCancel}
                            >
                                Cancel Changes
                            </Button>

                            <Button
                                style={{
                                    backgroundColor: "#2E8B57",
                                    border: "none",
                                    padding: "10px 25px",
                                    color: "white"
                                }}
                                onClick={handleSave}
                            >
                                Save Profile
                            </Button>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminProfile;
