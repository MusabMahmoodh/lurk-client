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

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const [qty, setQty] = useState(1);
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);
  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-outline-dark my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col xs={6} md={6}>
            <Image src={product.image} alt={product.name} fluid />

            <Button
              onClick={addToCartHandler}
              className="d-block btn-block d-sm-none"
              disabled={product.isAvailable == 0}
              style={{ marginTop: "10px" }}
              variant={product.isAvailable ? "success" : "danger"}
              type="button">
              {product.isAvailable ? "Add to Cart" : "Out of stock"}
            </Button>
          </Col>

          <Col xs={6} md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-light text-dark">
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item className="bg-light text-dark">
                Selling Price: <strong>Rs.{product.newPrice}.00</strong>
              </ListGroup.Item>
              <ListGroup.Item className="bg-light text-dark">
                Market Price: <small>Rs.{product.price}.00</small>
              </ListGroup.Item>

              <ListGroup.Item className="bg-light text-dark">
                Description: <small>{product.description}</small>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col xs={12} md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light text-dark">
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Rs.{product.newPrice}.00</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light text-dark">
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.isAvailable ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.isAvailable && (
                  <ListGroup.Item className="bg-light text-dark">
                    <Row>
                      <Col>Quantity</Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup size="sm" className="mb-3">
                          <FormControl
                            aria-label="Quantity"
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

                <ListGroup.Item className="bg-light text-dark">
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block d-none d-sm-block"
                    disabled={product.isAvailable == 0}
                    variant={product.isAvailable ? "success" : "danger"}
                    type="button">
                    {product.isAvailable ? "Add to Cart" : "Out of stock"}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
