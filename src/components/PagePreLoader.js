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
      <h1 className="text-anime">
        WELCOME TO{" "}
        <b>
          <u>LURK</u>
        </b>
      </h1>
    </div>
  );
};

export default PagePreLoader;
