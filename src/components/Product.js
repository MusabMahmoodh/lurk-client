import React from "react";
import { Card, Badge } from "react-bootstrap";
// import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="p-1 rounded" style={{ margin: "auto", height: "100%" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img className=" p-1 rounded" src={product.image} />
      </Link>

      <Card.Body style={{ padding: "8px" }}>
        <Card.Text as="div">
          <Badge variant="primary">{product.brand}</Badge>{" "}
          <Badge variant="secondary">
            {product.isAvailable ? "Available" : "Out of stock"}
          </Badge>{" "}
        </Card.Text>
        <Card.Title
          as="div"
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as="div">
          RS. {product.newPrice}
          <strike
            style={{
              color: "red",

              marginLeft: "1px",
            }}>
            <small>Rs. {product.price}</small>{" "}
          </strike>
        </Card.Text>
        <Card.Text as="div">
          <Link to={`/product/${product._id}`}>
            <i class="fas fa-shopping-cart" style={{ float: "right" }}></i>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
