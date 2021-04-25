import React from "react";
import { Spinner } from "react-bootstrap";

const PagePreLoader = () => {
  return (
    <div
      style={{
        zIndex: "999",

        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
      }}
      className="text-anime-container">
      <div className="spinners">
        <div className="" style={{ color: "white" }}>
          <h3>Processing...</h3>
        </div>
        <div className="" >
          <Spinner animation="grow" variant="light" />
          {"  "}
          <Spinner animation="grow" variant="light" />
          {"  "}
          <Spinner animation="grow" variant="light" />
        </div>
      </div>
    </div>
  );
};

export default PagePreLoader;
