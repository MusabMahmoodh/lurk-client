import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
  var objURL = {
    keyword: "",
    category: "",
  };
  if (keyword) {
    // keyword = keyword.split("?keyword=")[1].split("&")[0];

    keyword.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function ($0, $1, $2, $3) {
        objURL = { ...objURL, $1: $3 };
      }
    );
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? `/?keyword=${objURL.keyword && objURL.keyword}&category=${
                    objURL.category && objURL.category
                  }&page=${x + 1}`
                : `/admin/productlist/?keyword=${
                    objURL.keyword && objURL.keyword
                  }&category=${objURL.category && objURL.category}&page=${
                    x + 1
                  }`
            }>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
