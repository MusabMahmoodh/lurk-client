import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
const SubMenu = (category) => {
  let history = useHistory();
  const [currentVaraition, setCurrenVariation] = useState("");
  const [currentSubVaraition, setCurrenSubVariation] = useState("");
  useEffect(() => {
    setCurrenVariation("");
  }, [category]);

  useEffect(() => {
    history.location.search.split("variation")[1] &&
      category.category.variations.length > 1 &&
      category.category.variations.forEach((vari) => {
        if (
          vari._id ===
          history.location.search
            .split("variation")[1]
            .split("&")[0]
            .split("=")[1]
        ) {
          setCurrenVariation(vari);
          history.location.search.split("subVariation")[1] &&
            vari.subVariations.forEach((subVari) => {
              if (
                subVari._id ===
                history.location.search
                  .split("subVariation")[1]
                  .split("&")[0]
                  .split("=")[1]
              ) {
                setCurrenSubVariation(subVari);
              }
            });
        }
      });
  }, [history]);
  return (
    <div>
      {category.category.variations.length > 0 &&
        category.category.variations.map((vari) => (
          <>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => {
                setCurrenVariation(vari);
                history.push(
                  `/?variation=${vari._id}&category=${category.category._id}`
                );
              }}
              active={vari._id === currentVaraition._id}>
              {vari.name}
            </Button>{" "}
          </>
        ))}
      <diV className="py-1"></diV>
      {currentVaraition !== "" &&
        currentVaraition.subVariations.length > 1 &&
        currentVaraition.subVariations.map((vari) => (
          <>
            <Badge
              variant={
                vari._id === currentSubVaraition._id ? "success" : "dark"
              }
              size="sm"
              pill
              className="btn"
              onClick={() => {
                history.push(
                  `/?variation=${currentVaraition._id}&subVariation=${vari._id}&category=${category.category._id}`
                );
              }}>
              {vari.name}
            </Badge>{" "}
          </>
        ))}
    </div>
  );
};

export default withRouter(SubMenu);
