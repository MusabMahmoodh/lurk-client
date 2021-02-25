import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import ToHome from "../components/layout/ToHome";
function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [name, setName] = useState(shippingAddress.name);
  const [contact, setContact] = useState(
    shippingAddress.contact ? shippingAddress.contact : "94"
  );
  const [email, setEmail] = useState(shippingAddress.email);
  const [address, setAddress] = useState(shippingAddress.address);
  const [nearestLandMark, setNearestLandMark] = useState(
    shippingAddress.nearestLandMark
  );
  const [checked, setChecked] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, name, contact, nearestLandMark, email })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2>Delivery</h2>
      <small className="text-danger">* Required</small>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>
            Name <small className="text-danger">*</small>
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            value={name ? name : ""}
            onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="contactNo">
          <Form.Label>
            Contact Number <small className="text-danger">*</small>
          </Form.Label>
          {"   "}
          <small className="text-danger">(Format:*947xxxxxxxx)</small>
          <Form.Control
            required
            type="text"
            placeholder="947xxxxxxxx"
            pattern="^(947)\d{8}"
            value={contact ? contact : ""}
            onChange={(e) => setContact(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Email-ID</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email ? email : ""}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>
            Delivery Address<small className="text-danger">*</small>
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Nearest Landmark</Form.Label>{" "}
          <small className="text-danger">(Example:HNB,BOC,cargills..)</small>
          <Form.Control
            type="text"
            placeholder="Enter nearest locations"
            value={nearestLandMark ? nearestLandMark : ""}
            onChange={(e) => setNearestLandMark(e.target.value)}></Form.Control>
        </Form.Group>

        <small className="text-danger">
          *Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our{"   "}
          <a
            href="https://drive.google.com/file/d/1pJ23yCAVMbDQnV_JXwB49L97-pXuBIT2/view"
            target="_blank"
            rel="noreferrer">
            Privacy Policy
          </a>
          .
        </small>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            onChange={(e) => setChecked(e.target.checked)}
          />
          I have read and agree to the website{" "}
          <a
            href="https://drive.google.com/file/d/1V7r7KM_Ef-auhSpt-q1N6WRSG0KONEx8/view"
            target="_blank"
            rel="noreferrer">
            Terms and Conditions.
          </a>
        </Form.Group>

        <Button
          type="submit"
          variant="light"
          style={{
            background: "#6f42c1",
            color: "#fff",
          }}
          disabled={!checked}>
          Proceed
        </Button>
      </Form>
      <ToHome />
    </FormContainer>
  );
}

export default ShippingScreen;
