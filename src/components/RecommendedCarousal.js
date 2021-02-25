import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecommendedCard from "./RecommendedCard";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import BgImg from "../assets/bg-image.jpg";
//if bg is true render background
const RecommendedCarousal = ({ bg }) => {
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
      ) : bg ? (
        <div
          className="scrolling-wrapper p-2"
          style={{
            marginBottom: "3px",
            backgroundImage: `url(${BgImg})`,
            borderRadius: "10px",
            display: "flex",
            // marginTop: "-20px",
          }}>
          {productsTop &&
            productsTop.map((product) => <RecommendedCard product={product} />)}
        </div>
      ) : (
        <div
          className="scrolling-wrapper p-2"
          style={{
            marginBottom: "3px",

            borderRadius: "10px",
            display: "flex",
            // marginTop: "-20px",
          }}>
          {productsTop &&
            productsTop.map((product) => <RecommendedCard product={product} />)}
        </div>
      )}
    </div>
  );
};

export default RecommendedCarousal;
