import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listAds } from "../actions/adActions";
// import { listTopProducts } from "../actions/productActions";

function ProductCarousel() {
  const dispatch = useDispatch();

  const advertisements = useSelector((state) => state.adList);
  const { error, loading, ads } = advertisements;

  useEffect(() => {
    dispatch(listAds());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover">
      {ads.advertisement &&
        ads.advertisement.map((ad) => (
          <Carousel.Item key={ad._id}>
            <Image
              src={ad.image}
              fluid
              style={{ height: "auto", width: "100%" }}
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ProductCarousel;
