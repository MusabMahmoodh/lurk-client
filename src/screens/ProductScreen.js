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
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-light text-dark">
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item className="bg-light text-dark">
                New Price: Rs. {product.newPrice}
              </ListGroup.Item>
              <ListGroup.Item className="bg-light text-dark">
                Old Price: <strike>Rs. {product.price}</strike>
              </ListGroup.Item>

              <ListGroup.Item className="bg-light text-dark">
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light text-dark">
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Rs. {product.newPrice}</strong>
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
                    className="btn-block"
                    disabled={product.isAvailable == 0}
                    type="button">
                    Add to Cart
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
