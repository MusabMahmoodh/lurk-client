import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecommendedCard from "./RecommendedCard";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
const RecommendedCarousal = () => {
  const dispatch = useDispatch();
  const topProductList = useSelector((state) => state.productTopRated);
  const { error, loading, productsTop } = topProductList;
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div
          className="scrolling-wrapper p-1"
          style={{ marginBottom: "3px", background: "#d4acd4" }}>
          {productsTop &&
            productsTop.map((product) => <RecommendedCard product={product} />)}
        </div>
      )}
    </div>
  );
};

export default RecommendedCarousal;
