import React from "react";
import { Card, Badge } from "react-bootstrap";
// import Rating from "./Rating";
import { Link } from "react-router-dom";
import Cart from "../assets/cart-1.svg";
function Product({ product }) {
  return (
    <Card
      className="product-card rounded"
      style={{
        margin: "auto",
        height: "100%",

        boxShadow: "1px 2px 5px rgba(0,0,0,0.5)",
        borderRadius: "15px",
        background: "white",
        position: "relative",
        backdropFilter: "blur(10px)",
      }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body style={{ padding: "8px", position: "relative" }}>
        <Card.Text as="div">
          {product.brand.length > 0 ? (
            <>
              <Badge style={{ background: "#002366", color: "white" }}>
                <small>{product.brand}</small>
              </Badge>{" "}
            </>
          ) : (
            ""
          )}

          {product.isAvailable ? (
            <Badge style={{ background: "#6f42c1", color: "white" }}>
              <small>Available </small>
            </Badge>
          ) : (
            <Badge variant="danger">
              <small>Out of stock</small>{" "}
            </Badge>
          )}
        </Card.Text>
        <Card.Title
          as="div"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: "5px",
            marginBottom: "35px",
            color: "black",
          }}>
          <h6>{product.name}</h6>
        </Card.Title>

        <Card.Text
          as="div"
          style={{
            position: "absolute",
            bottom: "25px",
            borderLeft: "1px solid #3333f3",
            paddingLeft: "5px",
            color: "black",
          }}>
          Rs.{product.newPrice}
          {Number(product.newPrice) !== Number(product.price) && (
            <strike
              style={{
                color: "#18BC9C",

                marginLeft: "10px",
              }}>
              <small>Rs.{product.price}</small>
            </strike>
          )}
        </Card.Text>

        <Card.Text
          as="div"
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",

            color: "#6f42c1",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Link
            to={`/product/${product._id}`}
            style={{
              color: "#6f42c1",
            }}>
            <img
              src={Cart}
              alt="add to cart"
              style={{
                // float: "right",
                width: "23px",
              }}></img>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
