import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
const SubMenu = (category) => {
  let history = useHistory();
  const [currentVaraition, setCurrenVariation] = useState("");
  const [currentSubVaraition, setCurrenSubVariation] = useState("");
  useEffect(() => {
    setCurrenVariation("");
  }, [category]);
  const handleClick = () => {
    if (currentSubVaraition !== "" && currentSubVaraition !== undefined) {
      history.push(
        `/?variation=${currentVaraition._id}&subVariation=${currentSubVaraition._id}&category=${category.category._id}`
      );
    } else {
      history.push(
        `/?variation=${currentVaraition._id}&category=${category.category._id}`
      );
    }
  };
  return (
    <div>
      {category.category.variations.length > 1 &&
        category.category.variations.map((vari) => (
          <>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setCurrenVariation(vari)}
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
              variant={vari._id === currentSubVaraition._id ? "dark" : "light"}
              size="sm"
              pill
              className="btn"
              onClick={() => setCurrenSubVariation(vari)}>
              {vari.name}
            </Badge>{" "}
          </>
        ))}
      {category.category.variations.length > 1 ? (
        <Button
          variant="light"
          size="sm"
          onClick={handleClick}
          style={{ background: "transparent", border: "none" }}>
          <i class="fas fa-filter"></i>
          <small>
            <em>Filter</em>
          </small>
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubMenu;
