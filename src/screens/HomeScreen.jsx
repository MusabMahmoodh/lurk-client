import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import RecommendedCarousal from "../components/RecommendedCarousal";
import SubMenu from "../components/layout/SubMenu";
import { listProducts } from "../actions/productActions";

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
      {!keyword && <ProductCarousel />}
      {Object.keys(category).length > 1 && <SubMenu category={category} />}
      <h5 className="my-2">Lurk collection</h5>
      <RecommendedCarousal />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <hr style={{ marginTop: 0 }}></hr>
          <Row style={{ width: "100%", margin: "auto" }}>
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
    </div>
  );
}

export default HomeScreen;
