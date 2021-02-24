import React, { useState, useEffect } from "react";
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCategories, categoryDetails } from "../../actions/categoryActions";
import { useHistory } from "react-router-dom";
const Input = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("All");
  const [currentCategory, setCurrentCategory] = useState({});
  let history = useHistory();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(categoryDetails(currentCategory));

    if (category) {
      history.push(`/?category=${category}&page=1`);
    } else if (
      categoryName === "All" &&
      history.location.pathname !== "/login"
    ) {
      history.push("/");
    }
  }, [category]);
  return (
    <div>
      <InputGroup style={{ maxWidth: "500px" }}>
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={categoryName}
          id="input-group-dropdown-1">
          <Dropdown.Item
            href="#"
            onClick={() => {
              setCategory("");
              setCategoryName("All");
              setCurrentCategory({});
            }}>
            All
          </Dropdown.Item>
          <Dropdown.Divider />
          {categories.category &&
            categories.category.map((cat) => (
              <Dropdown.Item
                href="#"
                onClick={() => {
                  setCategory(cat._id);
                  setCategoryName(cat.name);
                  setCurrentCategory(cat);
                }}>
                {cat.name}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        <FormControl
          aria-describedby="basic-addon1"
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon2" onClick={submitHandler}>
            <i class="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default Input;
