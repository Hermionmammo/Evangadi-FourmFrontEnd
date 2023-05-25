import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homepage.css";
import { UserContext } from "../../contexts/UserContext";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../imgs/evangadi-logo-home.png";
function Header({ signOut }) {
  const [route, setRoute] = useState("signup");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [display, setDisplay] = useState(userData ? "logout" : "Sign Up");
  function clickHandler() {
    if (display === "Sign Up") {
      setDisplay("logout");
      navigate("/login");
    } else {
      setDisplay("Sign Up");
      navigate("/signup");
    }
    if (display === "logout") {
      signOut();
    }
  }
  return (
    <div className="header container-fluid mx-sm-5">
      <div className="innerContainer container d-flex justify-content-around ">
        <div className="header__image">
          <a href="/">
            <img src={logo} alt="Evangadi logo" />
          </a>
        </div>
        <Navbar bg="light" expand="lg">
          <Container fluid style={{ marginLeft: "100px" }}>
            {/* <Navbar.Brand href="#">Home </Navbar.Brand> */}
            <Navbar.Toggle aria-controls="navbarScroll " className="mx-5" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-3 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/" className=" fs-5  my-md-3 my-sm-0">
                  <strong>Home</strong>
                </Nav.Link>

                <Nav.Link href="/home" className="mx-3 fs-5  my-md-3 my-sm-0">
                  <strong>How It Works</strong>
                </Nav.Link>

                <Nav.Link to={`/${route}`} onClick={clickHandler}>
                  <strong>
                    {" "}
                    <div className="innerContainer2 justify-content-between d-md-block">
                      <a
                        to={`/${route}`}
                        onClick={clickHandler}
                        className="loginHeader"
                      >
                        {display}{" "}
                      </a>
                    </div>
                  </strong>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
