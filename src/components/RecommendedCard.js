import React from "react";
import { Card, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import Rating from "./Rating";
import { useHistory } from "react-router-dom";

function RecommendedCard({ product }) {
  let history = useHistory();
  const goToProduct = () => {
    history.push(`/product/${product._id}`);
  };
  return (
    <Card
      className="p-1 rounded"
      onClick={() => goToProduct()}
      style={{
        margin: "3px",
        width: "100px",
        minWidth: "100px",
        marginBottom: 0,

        color: "black",
        background: "rgba(255,255,255,.9)",
        borderTop: "1px solid rgba(255,255,255,1)",
        borderLeft: "1px solid rgba(255,255,255,1)",
        cursor: "pointer",
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
          <Badge style={{ background: "#002366", color: "white" }}>
            <small>{product.brand}</small>
          </Badge>{" "}
        </Card.Text>
        {/* <LinkContainer to={`/product/${product._id}`}> */}

        <Card.Title
          as="div"
          style={{
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            marginTop: "5px",
            marginBottom: "0",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}>
          <h6
            style={{
              fontSize: "0.6rem",
            }}>
            {product.name}
          </h6>
        </Card.Title>
        {/* </LinkContainer> */}
        <Card.Text as="div" style={{ marginTop: 0, marginBottom: 0 }}>
          Rs.{product.newPrice}
          {Number(product.newPrice) !== Number(product.price) && (
            <strike
              style={{
                color: "#18BC9C",
              }}>
              <div
                style={{
                  margin: "0",
                  width: "100%",
                  height: ".1px",
                  background: "white",
                  padding: "0",
                }}></div>
              <small style={{ color: "#18BC9C" }}>Rs.{product.price}</small>{" "}
            </strike>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RecommendedCard;
