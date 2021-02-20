import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
// import { listTopProducts } from "../actions/productActions";

function ProductCarousel() {
  const dispatch = useDispatch();
  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1527734839130-09fdf5d67316?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyb3VzZWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=60",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506426235353-205ad887bb38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1513972400628-4ae6371f9124?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
    },
  ];
  //   const productTopRated = useSelector((state) => state.productTopRated);
  //   const { error, loading, products } = productTopRated;

  //   useEffect(() => {
  //     dispatch(listTopProducts());
  //   }, [dispatch]);

  //   return loading ? (
  //     <Loader />
  //   ) : error ? (
  //     <Message variant="danger">{error}</Message>
  //   ) :
  return (
    <Carousel pause="hover" className="bg-dark">
      {/* {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel.caption">
              <h4>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))} */}
      {products.map((product) => (
        <Carousel.Item key={product._id} className="text-center">
          {/* <Link to={`/product/${product._id}`}> */}

          <Image
            src={product.image}
            fluid
            style={{ height: "30vh", margin: "auto" }}
          />

          {/* <Carousel.Caption className="carousel.caption">
              {/* <h4>
                {product.name} (${product.price})
              </h4> */}
          {/* </Carousel.Caption> */}
          {/* </Link> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
