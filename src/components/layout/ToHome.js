import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const ToHome = () => {
  var history = useHistory();
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        margin: "auto",
        left: "0",
        right: "0",
        zIndex: "456",
        width: "100%",
      }}>
      <Button
        style={{ maxWidth: "600px", margin: "auto" }}
        className="btn-block"
        onClick={() => history.push("/")}
        variant="primary">
        <i class="fas fa-store"></i> Back to store
      </Button>
    </div>
  );
};

export default ToHome;
