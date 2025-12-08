// src/components/Admin/AdminDestinations.jsx

import { Container, Row, Col, Input, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDestinations,
  deleteDestination
} from "../features/AdminSlice";
import { FaSearch, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDestinations = ({ theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const destinations = useSelector((state) => state.admin.destinations);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllDestinations());
  }, [dispatch]);

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
    <Container
      fluid
      style={{
        backgroundColor: theme === "light" ? "#F5EDD6" : "#0F172A",
        minHeight: "100vh",
        paddingTop: "40px"
      }}
    >
      <Row className="justify-content-center">
        <Col md="8">
          <div
            style={{
              backgroundColor: theme === "light" ? "white" : "#142A45",
              padding: "40px",
              borderRadius: "0px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
          >

            <Row className="align-items-center">
              <Col md="12" style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "70%" }}>
                  <Input
                    type="text"
                    placeholder="Search destinations"
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      padding: "15px 50px 15px 15px",
                      fontSize: "17px",
                      borderRadius: "8px",
                      color: "black",
                      backgroundColor: theme === "light" ? "white" : "#E5E7EB"
                    }}
                  />
                  <FaSearch
                    size={22}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#999",
                      pointerEvents: "none"
                    }}
                  />
                </div>
              </Col>
            </Row>


            <div style={{ marginTop: "40px" }}>
              {destinations
                .filter((d) =>
                  d.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((d) => (
                  <div
                    key={d._id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "0px",
                      border: "0.5px solid #000",
                      padding: "20px",
                      marginBottom: "25px",
                      boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                      display: "flex"
                    }}
                  >
                    <img
                      src={d.image}
                      width="160px"
                      height="110px"
                      style={{ borderRadius: "6px", marginRight: "20px", borderRadius: "0px" }}
                      alt={d.title}
                    />

                    <div style={{ flexGrow: 1, color: "black" }}>
                      <b>Destination Name: {d.title}</b>
                      <br />
                      Country: {d.country}
                      <br />
                      Category: {d.category}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#1F2A44",
                          color: "white",
                          border: "none",
                          padding: "8px 18px",
                          borderRadius: "0px"
                        }}
                        onClick={() => handleEdit(d._id)}
                      >
                        <FaEdit /> Edit
                      </Button>

                      <Button
                        style={{
                          backgroundColor: "#F58B8B",
                          color: "white",
                          border: "none",
                          padding: "8px 18px",
                          borderRadius: "0px"
                        }}
                        onClick={() => handleDelete(d._id)}
                      >
                        Delete
                      </Button>
                    </div>


                  </div>
                ))}

              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <Button
                  style={{
                    backgroundColor: theme === "light" ? "#1F2A44" : "#324C70",
                    color: "white",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "0px"
                  }}
                  onClick={handleAdd}
                >
                  <FaPlus /> Add
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDestinations;
