import React from "react";
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";
const Input = () => {
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
        <FormControl aria-describedby="basic-addon1" />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon2">
            <i class="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default Input;
