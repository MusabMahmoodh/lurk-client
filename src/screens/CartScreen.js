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

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
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

  return (
    <Row className="py-2 ">
      <Col xs={12}>
        <h2 className="pb-2 ">Shopping Cart</h2>
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
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col xs={8} md={10}>
                    <Row>
                      <Col xs={12} md={2}>
                        <Link
                          to={`/product/${item.product}`}
                          style={{ color: "white" }}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col xs={12} md={3}>
                        Rs. {item.price}x{item.qty} =Rs {item.price * item.qty}
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
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          />
                        </InputGroup>
                      </Col>

                      <Col xs={4} md={2}>
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => removeFromCartHandler(item.product)}>
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
              <h3>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
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
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}>
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
