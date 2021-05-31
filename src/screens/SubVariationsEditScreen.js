import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  subVariationDetails,
  updateSubVariation,
} from "../actions/subVariations";
import { SUBVARIATION_UPDATE_RESET } from "../constants/subVariationsConstants";

const ProductEditScreen = ({ match, history }) => {
  const subVariationId = match.params.id;

  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const subVariationDetail = useSelector((state) => state.subVariationsDetails);
  const { loading, error, subVariation } = subVariationDetail;

  const subVariationUpdate = useSelector((state) => state.subVariationsUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = subVariationUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUBVARIATION_UPDATE_RESET });
      history.push("/admin/subvariationslist");
    } else {
      // if (!subVariation.name || subVariation._id !== subVariationId) {
      //   dispatch(subVariationDetails(subVariationId));
      // } else {
      //   setName(subVariation.name);
      // }
    }
  }, [
    dispatch,
    history,
    subVariationId,
    subVariation,
    successUpdate,
    subVariationDetail,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSubVariation({
        _id: subVariationId,
        name,
      })
    );
  };

  return (
    <>
      <Link onClick={() => history.goBack()} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit Sub Variation</h2>
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

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
