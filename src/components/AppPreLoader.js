import React from "react";
import anim from "../assets/anim.svg";
const AppPreLoader = () => {
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
      <h1 className="text-anime"></h1>
      <object type="image/svg+xml" data={anim}>
        svg-animation
      </object>
    </div>
  );
};

export default AppPreLoader;
