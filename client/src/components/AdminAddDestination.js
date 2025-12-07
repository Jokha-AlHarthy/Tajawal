import { Container, Row, Col, FormGroup, Input, Button, Label } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDestination } from "../features/AdminSlice";
import { useNavigate } from "react-router-dom";

const AdminAddDestination = () => {

    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSave = () => {
        const data = {
            title: title,
            country: country,
            category: category,
            image: image
        };

        dispatch(addDestination(data)).then((res) => {
            if (res.payload && res.payload.message === "Success") {
                navigate("/admin/destinations");
            }
        });
    };

    const handleCancel = () => {
        navigate("/admin/destinations");
    };

    return (
        <Container
            fluid
            style={{
                backgroundColor: "#F5EDD6",
                minHeight: "100vh",
                paddingBottom: "40px"
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    width: "85%",
                    margin: "100px auto 0 auto",
                    padding: "40px 60px",
                    borderRadius: "15px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}
            >
                <Row className="justify-content-center" style={{ marginTop: "40px" }}>
                    <Col md="7">
                        <div style={{
                            backgroundColor: "white",
                            padding: "40px 60px",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                        }}>
                            <FormGroup>
                                <Label style={{ fontWeight: "bold" }}>Destination Title</Label>
                                <Input type="text" placeholder="Enter destination title" onChange={(e) => setTitle(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label style={{ fontWeight: "bold" }}>Country</Label>
                                <Input type="text" placeholder="Enter country" onChange={(e) => setCountry(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label style={{ fontWeight: "bold" }}>Category</Label>
                                <Input type="text" placeholder="Mountain / Nature / City / Cultural" onChange={(e) => setCategory(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label style={{ fontWeight: "bold" }}>Image URL</Label>
                                <Input type="text" placeholder="Enter image url" onChange={(e) => setImage(e.target.value)} />
                            </FormGroup>

                            <div style={{ marginTop: "30px", display: "flex" }}>
                                <Button
                                    style={{
                                        backgroundColor: "#2E8B57",
                                        border: "none",
                                        padding: "10px 25px",
                                        marginRight: "20px"
                                    }}
                                    onClick={handleSave}
                                >
                                    Save Changes
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
                                    Cancel Changes
                                </Button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default AdminAddDestination;
