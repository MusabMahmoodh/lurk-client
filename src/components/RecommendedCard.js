import React from "react";
import { Card, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
        color: "#7b8a8b",
      }}>
      <LinkContainer to={`/product/${product._id}`}>
        <Card.Img
          className=" p-1 rounded"
          src={product.image}
          style={{ height: "60px" }}
        />
      </LinkContainer>

      <Card.Body style={{ marginTop: "2px", padding: 0 }}>
        <Card.Text as="div">
          <Badge variant="warning">{product.brand}</Badge>{" "}
        </Card.Text>
        <LinkContainer to={`/product/${product._id}`}>
          <Card.Title as="div">
            <p
              style={{
                marginBottom: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",

                textOverflow: "ellipsis",
              }}>
              {product.name}
            </p>
          </Card.Title>
        </LinkContainer>
        <Card.Text
          as="div"
          style={{ marginTop: 0, marginBottom: 0, marginTop: "-10px" }}>
          RS.{product.newPrice}
          <strike
            style={{
              color: "red",
            }}>
            <div
              style={{
                margin: "0",
                width: "100%",
                height: ".1px",
                background: "#95a5a6",
                padding: "0",
              }}></div>
            <small>Rs.{product.price}</small>{" "}
          </strike>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RecommendedCard;
