import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer
            to="/"
            style={{
              color: "#6f42c1",
              padding: "10px",
            }}>
            <Nav.Link>Store</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{ padding: "10px" }}>
            Store
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer
            to="/shipping"
            style={{
              color: "#6f42c1",
              padding: "10px",
            }}>
            <Nav.Link>Delivery</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{ padding: "10px" }}>
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer
            to="/payment"
            style={{
              color: "#6f42c1",
              padding: "10px",
            }}>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{ padding: "10px" }}>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer
            to="/placeorder"
            style={{
              color: "#6f42c1",
              padding: "10px",
            }}>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{ padding: "10px" }}>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
