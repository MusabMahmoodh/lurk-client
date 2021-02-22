import React from "react";
import { Card, Badge } from "react-bootstrap";
// import Rating from "./Rating";
import { Link } from "react-router-dom";

function RecommendedCard({ product }) {
  return (
    <Card
      className="p-1 rounded"
      style={{
        margin: "3px",
        width: "100px",
        marginBottom: 0,
        background: "#ecf0f1",
      }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className=" p-1 rounded"
          src={product.image}
          style={{ height: "60px" }}
        />
      </Link>

      <Card.Body style={{ marginTop: "2px", padding: 0 }}>
        <Card.Title
          as="div"
          style={{
            marginBottom: 0,
            width: "100%",

            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
          <strong style={{ width: "100%" }}>{product.name}</strong>
        </Card.Title>
        <Card.Text as="div" style={{ marginTop: 0, marginBottom: 0 }}>
          RS. {product.newPrice}
          <strike
            style={{
              color: "red",
            }}>
            <br></br>
            <small>Rs. {product.price}</small>{" "}
          </strike>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RecommendedCard;
