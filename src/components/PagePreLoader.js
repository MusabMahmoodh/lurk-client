import React from "react";

const PagePreLoader = () => {
  return (
    <div
      style={{
        zIndex: "999",
        background: "white",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
      }}
      className="text-anime-container">
      <div className="text-anime">
        LURK <div></div>
        <small style={{ fontSize: ".3rem", display: "inline" }}>
          We are different. We are simple
        </small>
        <small style={{ fontSize: ".3rem", display: "inline" }}>
          We are simple
        </small>
        <small style={{ fontSize: ".3rem", display: "inline" }}>
          We are inexpensive.
        </small>
        <small style={{ fontSize: ".5rem", display: "inline" }}>
          You're welcomed. World of LURK.
        </small>
      </div>
    </div>
  );
};

export default PagePreLoader;
