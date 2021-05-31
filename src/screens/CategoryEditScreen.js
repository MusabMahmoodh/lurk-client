import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { listVariations } from "../actions/variations";
import { CATEGORY_UPDATE_RESET } from "../constants/categoryConstants";
import { updateCategory } from "../actions/categoryActions";

const CategoryEditScreen = ({ match, history }) => {
  const categoryId = match.params.id;

  const [name, setName] = useState("");
  const [vars, setVars] = useState([]);

  const dispatch = useDispatch();

  const variationsList = useSelector((state) => state.variationsList);
  const { variations } = variationsList;
  const categoryDetail = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetail;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push("/admin/categorylist");
    } else {
      // if (!subVariation.name || subVariation._id !== subVariationId) {
      //   dispatch(subVariationDetails(subVariationId));
      // } else {
      //   setName(subVariation.name);
      // }
      dispatch(listVariations());
    }
  }, [dispatch, history, category, successUpdate, categoryDetail]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
        variations: vars,
      })
    );
  };

  return (
    <>
      <button onClick={() => history.goBack()} className="btn btn-light my-3">
        Go Back
      </button>
      <FormContainer>
        <h2>Edit Category</h2>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Select variation</Form.Label>
              <Form.Control
                as="select"
                multiple
                onChange={(e) => {
                  const selected = [];
                  for (const item of e.target.selectedOptions) {
                    selected.push(item.value);
                  }
                  setVars(selected);
                }}>
                {variations.variations &&
                  variations.variations.map((sv) => (
                    <option value={sv._id}>{sv.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CategoryEditScreen;
