import {Container,Row,Col,FormGroup,Input,Button,Label} from "reactstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminProfile } from "../features/AdminSlice";
import { useNavigate } from "react-router-dom";
import { FaSave, FaTimes, FaCamera } from "react-icons/fa";

const AdminProfile = ({ theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.admin);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!admin) return;
    setFirstName(admin.firstName || "");
    setLastName(admin.lastName || "");
    setEmail(admin.email || "");
    setDateOfBirth(admin.dateOfBirth ? admin.dateOfBirth.substring(0, 10) : "");
    setPhone(admin.phone || "");

    if (admin.profilePic?.data) {
      const base64 = btoa(
        new Uint8Array(admin.profilePic.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setPreview(`data:image/jpeg;base64,${base64}`);
    } else {
      setPreview(
        "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
      );
    }
  }, [admin]);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePic(file);
    setPreview(URL.createObjectURL(file)); 
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("phone", phone);
    if (profilePic instanceof File) {
      formData.append("profilePic", profilePic);
    }
    dispatch(updateAdminProfile(formData)).then((res) => {
      if (res.payload?.message === "Success") {
        navigate("/admin/destinations");
      }
    });
  };


  const handleCancel = () => navigate("/admin/destinations");
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
              padding: "50px",
              borderRadius: "0px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              textAlign: "center",
              position: "relative"
            }}
          >
            <div style={{ position: "relative", width: "130px", margin: "0 auto" }}>
              <img
                src={preview}
                alt="profile"
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <label
                htmlFor="adminPicUpload"
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  background: "#FFFFFF",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FaCamera style={{ color: "black", fontSize: "18px" }} />  {/* BLACK ICON */}
              </label>
              <input
                id="adminPicUpload"
                type="file"
                accept="image/*"
                onChange={handlePicChange}
                style={{ display: "none" }}
              />
            </div>
            <h3 style={{ fontWeight: "bold", marginBottom: "25px" }}>
              Admin Profile
            </h3>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label style={{ fontWeight: "bold" }}>First Name</Label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label style={{ fontWeight: "bold" }}>Last Name</Label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }}>Email</Label>
              <Input type="email" value={email} disabled />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }}>Date of Birth</Label>
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }}>Phone</Label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormGroup>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                gap: "20px"
              }}
            >
              <Button
                style={{
                  backgroundColor: "#C0C0C0",
                  border: "none",
                  padding: "10px 25px",
                  borderRadius: "0px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={handleCancel}
              >
                <FaTimes />
                Cancel
              </Button>

              <Button
                style={{
                  backgroundColor: "#2E8B57",
                  border: "none",
                  padding: "10px 25px",
                  color: "white",
                  borderRadius: "0px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={handleSave}
              >
                <FaSave />
                Save
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
