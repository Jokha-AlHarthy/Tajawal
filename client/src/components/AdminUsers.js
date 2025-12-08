// src/components/Admin/AdminUsers.jsx

import { Container, Row, Col, Input, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../features/AdminSlice";
import { FaSearch, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminUsers = ({ theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.admin.users);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (email) => {
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(email)).then(() => {
        dispatch(getAllUsers());
      });
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor:
          theme === "light" ? "#F5EDD6" : "#0F172A", 
        minHeight: "100vh",
        paddingTop: "40px"
      }}
    >
      <Row className="justify-content-center">
        <Col md="10">

          <div
            style={{
              backgroundColor: theme === "light" ? "white" : "#111827",
              color: theme === "light" ? "black" : "white",
              marginTop: "40px",
              padding: "40px",
              borderRadius: "0px",
              boxShadow: "0 0 8px rgba(0,0,0,0.15)"
            }}
          >
            <Row className="align-items-center">
              <Col md="11">
                <div style={{ position: "relative", width: "100%" }}>
                  <Input
                    type="text"
                    placeholder="Search user (name, email, phone)"
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      padding: "15px 45px 15px 15px",
                      fontSize: "17px",
                      borderRadius: "8px"
                    }}
                  />
                  <FaSearch
                    size={22}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#888"
                    }}
                  />
                </div>
              </Col>

              <Col md="1"></Col>
            </Row>

            <br />
            {/* Table Header */}
            <Row
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "20px"
              }}
            >
              <Col>Full Name</Col>
              <Col>Email</Col>
              <Col>Phone</Col>
              <Col>DOB</Col>
              <Col style={{ textAlign: "center" }}>Actions</Col>
            </Row>

            {users
              .filter((u) => {
                const s = search.toLowerCase();
                return (
                  u.email.toLowerCase().includes(s) ||
                  (u.fname && u.fname.toLowerCase().includes(s)) ||
                  (u.lname && u.lname.toLowerCase().includes(s)) ||
                  (u.phone && u.phone.includes(s))
                );
              })
              .map((u) => (
                <Row
                  key={u.email}
                  style={{
                    marginBottom: "22px",
                    fontSize: "17px",
                    alignItems: "center"
                  }}
                >
                  <Col>{u.firstName} {u.lastName}</Col>
                  <Col>{u.email}</Col>
                  <Col>{u.phone || "-"}</Col>
                  <Col>{u.dateOfBirth || "-"}</Col>
                  <Col style={{ textAlign: "center" }}>
                    <Button
                      style={{
                        backgroundColor: "#1F2A44",
                        color: "white",
                        border: "none",
                        marginRight: "10px",
                        padding: "8px 18px",
                        borderRadius: "0px",
                        fontWeight: "bold"
                      }}
                      onClick={() => navigate(`/admin/user/edit/${u.email}`)}
                    >
                      <FaEdit /> Edit
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "#F58B8B",
                        color: "white",
                        border: "none",
                        padding: "8px 18px",
                        borderRadius: "0px",
                        fontWeight: "bold"
                      }}
                      onClick={() => handleDelete(u.email)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminUsers;
