import React, { useState } from "react";
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Input = () => {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  return (
    <div>
      <InputGroup style={{ maxWidth: "500px" }}>
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title="All"
          id="input-group-dropdown-1">
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
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
