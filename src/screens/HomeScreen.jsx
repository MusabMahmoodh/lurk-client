import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Product from "../components/Product";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Container fluid style={{ padding: 0 }}>
      <h1>Latest Products</h1>
      <div></div>
      <Row style={{ width: "100%", margin: "auto" }}>
        {products &&
          products.map((product) => (
            <Col
              xs={6}
              lg={3}
              xl={2}
              key={product.id}
              className="justify-content-center align-items-center"
              style={{
                margin: "0",
                padding: "5px",
              }}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
