import { Container, Row, Col, FormGroup, Input, Button, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDestinations } from "../features/AdminSlice";
import axios from "axios";
import { FaFloppyDisk, FaXmark } from "react-icons/fa6";


const AdminEditDestination = ({ theme }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const destinations = useSelector((state) => state.admin.destinations);
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    dispatch(getAllDestinations());
  }, [dispatch]);
  useEffect(() => {
    const dest = destinations.find((d) => d._id === id);
    if (dest) {
      setTitle(dest.title || "");
      setCountry(dest.country || "");
      setCategory(dest.category || "");
      setImage(dest.image || "");
    }
  }, [destinations, id]);
  const handleUpdate = async () => {
    const data = { _id: id, title, country, category, image };
    const res = await axios.put("https://tajawal.onrender.com/admin/destination/update", data);
    if (res.data.message === "Success") navigate("/admin/destinations");
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
              boxShadow: "0 0 10px rgba(0,0,0,0.15)"
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "35px"
              }}
            >
              Edit Destination Information
            </h4>
            <FormGroup style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Label style={{ width: "180px", fontWeight: "600", marginBottom: "0" }}>Destination Name</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: "12px", borderRadius: "5px" }}
              />
            </FormGroup>
            <FormGroup style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Label style={{ width: "180px", fontWeight: "600", marginBottom: "0" }}>Country</Label>
              <Input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ padding: "12px", borderRadius: "5px" }}
              />
            </FormGroup>
            <FormGroup style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Label style={{ width: "180px", fontWeight: "600", marginBottom: "0" }}>Category</Label>
              <Input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: "12px", borderRadius: "5px" }}
              />
            </FormGroup>
            <FormGroup style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Label style={{ width: "180px", fontWeight: "600", marginBottom: "0" }}>Image</Label>
              <Input
                type="text"
                value={image}
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
                onClick={handleUpdate}
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

export default AdminEditDestination;


