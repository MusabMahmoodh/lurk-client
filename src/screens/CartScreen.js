import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  FormControl,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import ToHome from "../components/layout/ToHome";
function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/shipping");
  };

  // To enable button
  useEffect(() => {
    console.log("Changed amount");
  }, [cartItems]);
  return (
    <Row className="py-2 ">
      <Link to="/" className="btn btn-outline-dark my-3">
        Go Back
      </Link>
      <Col xs={12}>
        <h2 className="pb-2 ">Shopping Cart</h2>
        <h5 className="text-danger">
          <strong style={{ fontWeight: "900", fontsize: "18px!important" }}>
            Minimum Order Value{" "}
            <span style={{ fontWeight: "500" }}>Rs.500.00</span>
          </strong>
        </h5>
      </Col>

      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.product}
                className="bg-primary text-light">
                <Row>
                  <Col xs={4} md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      style={{ border: "solid 1px white" }}
                    />
                  </Col>
                  <Col xs={8} md={10}>
                    <Row>
                      <Col xs={12} md={2}>
                        <Link
                          to={`/product/${item.product}`}
                          style={{ color: "white" }}>
                          <h6>{item.name}</h6>
                        </Link>
                      </Col>
                      <Col xs={12} md={3}>
                        <Row style={{ color: "white" }}>
                          <Col xs={6}>
                            <small>
                              Rs.{item.price}.00
                              {"    "}
                              <span style={{ color: "#95a5a6" }}>x</span>{" "}
                              {item.qty}{" "}
                            </small>
                          </Col>
                          <Col
                            xs={6}
                            style={{
                              position: "relative",
                            }}>
                            <small
                              style={{ position: "absolute", right: "2px" }}>
                              Rs {item.price * item.qty}.00
                            </small>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={12} md={1}>
                        <div style={{ height: "20px" }}></div>
                      </Col>
                      <Col xs={8} md={4}>
                        <InputGroup size="sm" className="mb-3">
                          <FormControl
                            aria-label="Quantity"
                            aria-describedby="inputGroup-sizing-sm"
                            type="number"
                            min="0"
                            value={item.qty}
                            style={{ color: " black" }}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          />
                        </InputGroup>
                      </Col>

                      <Col
                        xs={4}
                        md={2}
                        style={{
                          position: "relative",
                        }}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                          style={{ position: "absolute", right: "2px" }}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-light text-dark">
              <h3 className="cursive">
                Total(
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
              </h3>
              Rs.
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item className="bg-light text-dark">
            <Button
              type="button"
              className="btn-block"
              style={{
                background: "#6f42c1",
                color: "#fff",
              }}
              variant="light"
              disabled={
                cartItems.length === 0 ||
                cartItems.reduce(
                  (acc, item) => acc + item.qty * item.price,
                  0
                ) < 500.0
              }
              onClick={checkoutHandler}>
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
      <ToHome />
    </Row>
  );
}

export default CartScreen;
