// src/components/Admin/AdminEditUser.jsx

import { Container, Row, Col, FormGroup, Input, Button, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/AdminSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaFloppyDisk, FaXmark } from "react-icons/fa6";


const AdminEditUser = ({ theme }) => {
  const { email } = useParams();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [profilepic, setProfilepic] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/user/${email}`).then((res) => {
      const u = res.data;

      setFname(u.firstName || "");
      setLname(u.lastName || "");
      setDob(u.dateOfBirth?.substring(0, 10) || "");
      setPhone(u.phone || "");

      if (u.profilePic && u.profilePic.data) {
        const base64String = btoa(
          new Uint8Array(u.profilePic.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setProfilepic(`data:image/jpeg;base64,${base64String}`);
      } else {
        setProfilepic("");
      }
    });
  }, [email]);

  const handleSave = () => {
    const data = {
      email,
      firstName: fname,
      lastName: lname,
      dateOfBirth: dob,
      phone,
      profilePic: profilepic
    };


    dispatch(updateUser(data)).then((res) => {
      if (res.payload && res.payload.message === "Success")
        navigate("/admin/users");
    });
  };

  const handleCancel = () => navigate("/admin/users");

  const def_pic =
    "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg";

  return (
    <Container
      fluid
      style={{
        backgroundColor: theme === "light" ? "#F5EDD6" : "#0F172A",
        minHeight: "100vh",
        paddingTop: "40px"
      }}
    >
      <Row className="justify-content-center">
        <Col md="6">
          <div
            style={{
              backgroundColor: theme === "light" ? "white" : "#111827",
              color: theme === "light" ? "black" : "white",
              padding: "50px 60px",
              borderRadius: "0px",
              boxShadow: "0 0 12px rgba(0,0,0,0.2)"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <img
                src={profilepic || def_pic}
                width="130"
                height="130"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #eee"
                }}
                alt="profile"
              />
            </div>
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
            <FormGroup>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{ padding: "14px", fontSize: "16px" }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                value={email}
                disabled
                style={{
                  padding: "14px",
                  fontSize: "16px",
                  backgroundColor: "#f0f0f0"
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: "14px", fontSize: "16px" }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Profile Picture URL</Label>
              <Input
                value={profilepic}
                onChange={(e) => setProfilepic(e.target.value)}
                style={{ padding: "14px", fontSize: "16px" }}
              />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "35px" }}>
              <Button
                style={{
                  backgroundColor: "#C5C4C4",
                  border: "none",
                  padding: "10px 30px",
                  marginRight: "20px",
                  color: "#ffffffff",
                  fontWeight: "600",
                  borderRadius: "0px"
                }}
                onClick={handleCancel}
              >
                <FaXmark />                
                Cancel Changes
              </Button>

              <Button
                style={{
                  backgroundColor: "#0C8B4C",
                  border: "none",
                  padding: "10px 30px",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "0px"
                }}
                onClick={handleSave}
              >
                <FaFloppyDisk />
                Save User
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditUser;
