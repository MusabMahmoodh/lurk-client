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
            marginBottom: "0",
          }}>
          <h6>{product.name}</h6>
        </Card.Title>
        <Card.Text as="div">
          Rs.{product.newPrice}
          <strike
            style={{
              color: "red",

              marginLeft: "10px",
            }}>
            <small>Rs.{product.price}</small>
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
