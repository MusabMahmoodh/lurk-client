import React from "react";
import { Card, Badge } from "react-bootstrap";
// import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card
      className="p-1 rounded"
      style={{
        margin: "auto",
        height: "100%",
        boxShadow: " 1px 2px 5px 0px rgba(0,0,0,0.75)",
      }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img className=" p-1 rounded" src={product.image} />
      </Link>

      <Card.Body style={{ padding: "8px", position: "relative" }}>
        <Card.Text as="div">
          <Badge variant="warning">{product.brand}</Badge>{" "}
          {product.isAvailable ? (
            <Badge variant="success">Available </Badge>
          ) : (
            <Badge variant="danger">Out of stock</Badge>
          )}
        </Card.Text>
        <Card.Title
          as="div"
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as="div">
          Rs.{product.newPrice}.00
          <strike
            style={{
              color: "red",

              marginLeft: "10px",
            }}>
            <small>Rs.{product.price}.00</small>
          </strike>
        </Card.Text>

        <Card.Text
          as="div"
          style={{
            position: "absolute",
            bottom: "2px",
            right: "2px",
            color: "#6f42c1",
          }}>
          <Link
            to={`/product/${product._id}`}
            style={{
              color: "#6f42c1",
            }}>
            <i
              class="fas fa-shopping-cart"
              style={{
                float: "right",
              }}></i>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
