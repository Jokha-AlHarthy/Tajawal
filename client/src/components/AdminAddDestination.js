import { Container, Row, Col, FormGroup, Input, Button, Label } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDestination } from "../features/AdminSlice";
import { useNavigate } from "react-router-dom";
import { FaFloppyDisk, FaXmark } from "react-icons/fa6";

const AdminAddDestination = ({ theme }) => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    const data = { title, country, category, image };
    dispatch(addDestination(data)).then((res) => {
      if (res.payload && res.payload.message === "Success") {
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
        <Col md="7">
          <div
            style={{
              backgroundColor: theme === "light" ? "white" : "#142A45",
              color: theme === "light" ? "black" : "white",
              padding: "50px 60px",
              borderRadius: "0px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)"
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "35px"
              }}
            >
              Add a new Destination
            </h4>

            <FormGroup style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Label style={{ width: "180px", fontWeight: "600", marginBottom: "0" }}>
                Destination Name
              </Label>
              <Input
                type="text"
                placeholder="Enter destination title"
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: "12px", borderRadius: "5px" }}
              />
            </FormGroup>

            <FormGroup style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Label style={{ width: "180px", fontWeight: "600", marginBottom: "0" }}>
                Country
              </Label>
              <Input
                type="text"
                placeholder="Enter country"
                onChange={(e) => setCountry(e.target.value)}
                style={{ padding: "12px", borderRadius: "5px" }}
              />
            </FormGroup>

            <FormGroup style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Label style={{ width: "180px", fontWeight: "600", marginBottom: "0" }}>
                Category
              </Label>
              <Input
                type="text"
                placeholder="Historical / Cultural / Nature / City"
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: "12px", borderRadius: "5px" }}
              />
            </FormGroup>

            <FormGroup style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Label style={{ width: "180px", fontWeight: "600", marginBottom: "0" }}>
                Image
              </Label>
              <Input
                type="text"
                placeholder="Enter image URL"
                onChange={(e) => setImage(e.target.value)}
                style={{ padding: "12px", borderRadius: "5px" }}
              />
            </FormGroup>

            <div
              style={{
                marginTop: "35px",
                display: "flex",
                justifyContent: "center",
                gap: "20px"
              }}
            >
              <Button
                style={{
                  backgroundColor: "#0C8B4C",
                  border: "none",
                  padding: "10px 25px",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "0px"
                }}
                onClick={handleSave}
              >
                <FaFloppyDisk/>&nbsp;
                Save Changes
              </Button>

              <Button
                style={{
                  backgroundColor: "#C0C0C0",
                  border: "none",
                  padding: "10px 25px",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "0px"
                }}
                onClick={handleCancel}
              >
               <FaXmark/>&nbsp;
                Cancel Changes
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddDestination;
