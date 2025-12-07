import { Container, Row, Col, Input, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDestinations, deleteDestination } from "../features/AdminSlice";
import { FaSearch, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDestinations = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const destinations = useSelector((state) => state.admin.destinations);

    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getAllDestinations());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this destination?")) {
            dispatch(deleteDestination(id)).then(() => {
                dispatch(getAllDestinations());
            });
        }
    };

    const handleAdd = () => {
        navigate("/admin/destination/add");
    };

    const handleEdit = (id) => {
        navigate(`/admin/destination/edit/${id}`);
    };

    return (
        <Container fluid style={{ backgroundColor: "#F5EDD6", minHeight: "100vh" }}>
            <Row className="justify-content-center" style={{ marginTop: "40px" }}>
                <Col md="8">

                    <Row className="align-items-center">
                        <Col md="11">
                            <Input
                                type="text"
                                placeholder="Search destinations"
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    padding: "15px",
                                    fontSize: "17px",
                                    borderRadius: "8px"
                                }}
                            />
                        </Col>
                        <Col md="1" style={{ textAlign: "center" }}>
                            <FaSearch size={22} />
                        </Col>
                    </Row>

                    <div style={{ marginTop: "40px" }}>
                        {
                            destinations
                                .filter((d) =>
                                    d.title.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((d) => {
                                    return (
                                        <div key={d._id} style={{
                                            backgroundColor: "white",
                                            borderRadius: "10px",
                                            padding: "20px",
                                            marginBottom: "25px",
                                            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                                            display: "flex"
                                        }}>

                                            <img src={d.image} width="160px" height="110px"
                                                style={{ borderRadius: "6px", marginRight: "20px" }}
                                            />

                                            <div style={{ flexGrow: 1 }}>
                                                <b>Destination: {d.title}</b><br />
                                                Country: {d.country}<br />
                                                Category: {d.category}
                                            </div>

                                            <div>
                                                <Button
                                                    style={{
                                                        backgroundColor: "#1F2A44",
                                                        color: "white",
                                                        border: "none",
                                                        marginRight: "10px"
                                                    }}
                                                    onClick={() => handleEdit(d._id)}
                                                >
                                                    <FaEdit /> Edit
                                                </Button>

                                                <Button
                                                    style={{
                                                        backgroundColor: "#F58B8B",
                                                        color: "white",
                                                        border: "none"
                                                    }}
                                                    onClick={() => handleDelete(d._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>

                                        </div>
                                    )
                                })
                        }

                        <div style={{ textAlign: "right", marginTop: "20px" }}>
                            <Button
                                style={{
                                    backgroundColor: "#1F2A44",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 22px"
                                }}
                                onClick={handleAdd}
                            >
                                <FaPlus /> Add
                            </Button>
                        </div>

                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default AdminDestinations;
