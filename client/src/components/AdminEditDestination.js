import { Container, Row, Col, FormGroup, Input, Button, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDestinations } from "../features/AdminSlice";
import axios from "axios";

const AdminEditDestination = () => {

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
    }, []);

    useEffect(() => {
        const dest = destinations.find((d) => d._id === id);
        if (dest) {
            setTitle(dest.title);
            setCountry(dest.country);
            setCategory(dest.category);
            setImage(dest.image);
        }
    }, [destinations]);

    const handleUpdate = async () => {
        const data = {
            _id: id,
            title: title,
            country: country,
            category: category,
            image: image
        };

        const res = await axios.put("http://localhost:5000/admin/destination/update", data);

        if (res.data.message === "Success") {
            navigate("/admin/destinations");
        }
    };

    const handleCancel = () => {
        navigate("/admin/destinations");
    };

    return (
        <Container fluid style={{ backgroundColor: "#F5EDD6", minHeight: "100vh" }}>
            <Row className="justify-content-center" style={{ marginTop: "40px" }}>
                <Col md="7">
                    <div style={{
                        backgroundColor: "white",
                        padding: "40px 60px",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                    }}>

                        <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Destination Name</Label>
                            <Input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Country</Label>
                            <Input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Category</Label>
                            <Input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Image URL</Label>
                            <Input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </FormGroup>

                        <div style={{ marginTop: "30px", display: "flex" }}>
                            <Button
                                style={{
                                    backgroundColor: "#2E8B57",
                                    border: "none",
                                    padding: "10px 25px",
                                    marginRight: "20px"
                                }}
                                onClick={handleUpdate}
                            >
                                ✔ Save Changes
                            </Button>

                            <Button
                                style={{
                                    backgroundColor: "#C0C0C0",
                                    border: "none",
                                    padding: "10px 25px",
                                    color: "white"
                                }}
                                onClick={handleCancel}
                            >
                                ✖ Cancel
                            </Button>
                        </div>

                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default AdminEditDestination;
