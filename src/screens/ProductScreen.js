import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

// import { listProductDetails, createProductReview } from '../actions/productActions'
import { listProductDetails } from "../actions/productActions";

// import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import RecommendedCarousal from "../components/RecommendedCarousal";
const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const [qty, setQty] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);
  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <div>
        <Link to="/" className="btn btn-outline-dark my-3 mb-3">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col xs={12} md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col xs={12} md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light text-dark">
                  <h5>{product.name}</h5>

                  <p className="cursive text-muted">{product.description}</p>
                </ListGroup.Item>
                {product.isAvailable && (
                  <ListGroup.Item className="bg-light text-dark">
                    <Row>
                      <Col className="cursive">Quantity</Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup size="sm" className="mb-3">
                          <FormControl
                            aria-label="Quantity"
                            style={{ color: "black" }}
                            aria-describedby="inputGroup-sizing-sm"
                            type="number"
                            min="0"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="bg-light text-dark cursive">
                  Selling Price: <strong>Rs.{product.newPrice}.00</strong>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light text-dark cursive">
                  Market Price:{" "}
                  <strike
                    style={{
                      color: "red",

                      marginLeft: "10px",
                    }}>
                    <small>Rs.{product.price}.00</small>
                  </strike>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col xs={12} md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-light text-dark ">
                    <Row>
                      <Col className="cursive">Status:</Col>
                      <Col className="cursive">
                        {product.isAvailable ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="bg-light text-dark">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block d-sm-block d-none"
                      disabled={product.isAvailable == 0}
                      variant={product.isAvailable ? "" : "danger"}
                      type="button"
                      style={{
                        background: "#6f42c1",
                        color: "#fff",
                      }}>
                      {product.isAvailable ? "Add to Cart" : "Out of stock"}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <div
              style={{
                position: "fixed",
                bottom: "0",
                zIndex: "456",
                width: "100%",
              }}
              className="d-block d-sm-none">
              <Row>
                <Col xs={3}>
                  <Button
                    className="btn-block"
                    onClick={() => history.push("/")}
                    variant="info">
                    <i class="fas fa-store"></i>
                  </Button>
                </Col>
                <Col xs={7}>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block "
                    disabled={product.isAvailable == 0}
                    style={{
                      background: "#6f42c1",
                      color: "#fff",
                    }}
                    variant="light"
                    type="button">
                    <i class="fas fa-shopping-cart"></i>{" "}
                    {product.isAvailable ? "Add to Cart" : "Out of stock"}
                  </Button>
                </Col>
                <Col xs={2}></Col>
              </Row>
            </div>
          </Row>
        )}
      </div>
      <p></p>
      <h5>You may also like</h5>
      <RecommendedCarousal bg={false} />
    </>
  );
};

export default ProductScreen;
