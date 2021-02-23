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
          className="scrolling-wrapper p-2"
          style={{
            marginBottom: "3px",
            background:
              "linear-gradient(4deg, rgba(22,0,36,1) 30%, rgba(119,0,255,1) 100%)",
            borderRadius: "10px",
            marginTop: "-20px",
          }}>
          {productsTop &&
            productsTop.map((product) => <RecommendedCard product={product} />)}
        </div>
      )}
    </div>
  );
};

export default RecommendedCarousal;
