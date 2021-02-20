import React from "react";

import RecommendedCard from "./RecommendedCard";
const RecommendedCarousal = (products) => {
  return (
    <div
      className="scrolling-wrapper p-1"
      style={{ marginBottom: "3px", background: "#d4acd4" }}>
      {products.products &&
        products.products.map((product) => (
          <RecommendedCard product={product} />
        ))}
    </div>
  );
};

export default RecommendedCarousal;
