import React from "react";

const PagePreLoader = () => {
  return (
    <div
      style={{
        zIndex: "999",

        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
      }}
      className="text-anime-container">
      <h1 className="text-anime">LURK</h1>
    </div>
  );
};

export default PagePreLoader;
