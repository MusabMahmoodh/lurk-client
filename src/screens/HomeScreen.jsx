import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import PagePreLoader from "../components/PagePreLoader";
import Loader from "../components/Loader";
import Product from "../components/Product";

import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import RecommendedCarousal from "../components/RecommendedCarousal";
import SubMenu from "../components/layout/SubMenu";
import { listProducts } from "../actions/productActions";
import Footer from "../components/layout/Footer";
function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  const currentCategory = useSelector((state) => state.categoryDetails);
  const { category } = currentCategory;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="py-0">
      <ProductCarousel />

      {!keyword && (
        <>
          <h5 className="py-4 text-center">LURK Recommendations</h5>
          <RecommendedCarousal bg={true} />
        </>
      )}

      {loading ? (
        <PagePreLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h5 className="text-center py-3">Latest Products</h5>
          {Object.keys(category).length > 1 && <SubMenu category={category} />}
          <hr style={{ marginTop: 0 }}></hr>

          <Row style={{ width: "100%", margin: "auto" }}>
            {products.products && products.products.length === 0 && (
              <div style={{ margin: "auto", textAlign: "center" }}>
                <Message variant="light">
                  <h6>Search No Result</h6>
                  We're sorry. We cannot find any matches for your search term.
                  <p></p>
                  <i
                    class="fab fa-searchengin fa-lg"
                    style={{ fontSize: "5rem" }}></i>
                </Message>
              </div>
            )}
            {keyword && products.products && (
              <div
                style={{
                  marginTop: "0",
                  textAlign: "left",
                  width: "100%",
                }}>
                <Message variant="light">
                  <small>
                    <strong>{products.products.length}</strong> Items found
                  </small>
                </Message>
              </div>
            )}
            {products.products &&
              products.products.map((product) => (
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default HomeScreen;
