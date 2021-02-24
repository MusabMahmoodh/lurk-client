import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import ToHome from "../components/layout/ToHome";
function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  //   cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  //   cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = Number(cart.itemsPrice)
    // Number(cart.shippingPrice) +
    // Number(cart.taxPrice)
    .toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      alert(`Thank you for your order at lurk,Order ID:${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      history.push(`/`);
    }
  }, [success, history]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: 0,
        // taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-light text-dark">
                <h3>Order Summary</h3>
              </ListGroup.Item>

              {/* <ListGroup.Item className="bg-light text-dark">
                <Row>
                  <Col><strShipping:</Col>
                  <Col>Free</Col>
                </Row>
              </ListGroup.Item> */}

              {/* <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item className="bg-light text-dark">
                {cart.cartItems.map((item, index) => (
                  <Row
                    style={{
                      marginBottom: "5px",
                      borderBottom: "solid 0.006rem grey",
                    }}>
                    <Col xs={5}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>

                    <Col xs={7}>
                      <small>
                        {item.qty} X Rs.{item.price}.00 = Rs.
                        {(item.qty * item.price).toFixed(2)}.00
                      </small>
                    </Col>
                  </Row>
                ))}

                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    <strong>Rs.{cart.totalPrice}.00</strong>{" "}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item className="bg-light text-dark">
                <Button
                  type="button"
                  className="btn-block"
                  style={{
                    background: "#6f42c1",
                    color: "#fff",
                  }}
                  variant="light"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-light text-dark">
              <p>
                <strong>Delivery address: </strong>
                {cart.shippingAddress.address},<br></br>
                <strong>Nearest Land Mark: </strong>
                {cart.shippingAddress.nearestLandMark},
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="bg-light text-dark">
              <p>
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="bg-light text-dark">
              <p>
                <strong>Order Items</strong>
              </p>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className="bg-dark text-light">
                      <Row>
                        <Col sm={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col sm={4}>
                          {item.qty} X Rs.{item.price}.00 = Rs.
                          {(item.qty * item.price).toFixed(2)}.00
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <ToHome />
    </div>
  );
}

export default PlaceOrderScreen;
