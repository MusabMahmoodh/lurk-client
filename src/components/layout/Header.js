import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Logo from "../../assets/Lurk-Logo.png";
import Input from "./Input";
const Header = () => {
  return (
    <Navbar
      bg="light"
      style={{ boxShadow: " 0px 3px 2px 0px rgba(0,0,0,0.44)" }}>
      <Row style={{ width: "100%" }}>
        <Col xs={6} md={4} className="m-auto order-1 order-md-1">
          <Navbar.Brand href="#home">
            <img src={Logo} height="30px" alt="fireSpot" />
          </Navbar.Brand>
        </Col>
        <Col xs={0} md={6} className="mr-auto order-3 order-md-2">
          <Input />
        </Col>
        <Col
          xs={6}
          md={2}
          className="m-auto text-right text-right order-2 order-md-3">
          <Nav className="mr-0">
            <Nav.Item>
              <Nav.Link href="/home">Sign In</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">
                <i class="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Navbar>
  );
};

export default Header;
