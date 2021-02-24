import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { updateVariation } from "../actions/variations";
import { listSubVariations } from "../actions/subVariations";
import { VARIATION_UPDATE_RESET } from "../constants/variationsConst";

const ProductEditScreen = ({ match, history }) => {
  const variationId = match.params.id;

  const [name, setName] = useState("");
  const [subVars, setSubVars] = useState([]);

  const dispatch = useDispatch();

  const subVariationsList = useSelector((state) => state.subVariationsList);
  const { subVariations } = subVariationsList;
  const variationDetail = useSelector((state) => state.variationsDetails);
  const { loading, error, variation } = variationDetail;

  const variationUpdate = useSelector((state) => state.variationsUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = variationUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VARIATION_UPDATE_RESET });
      history.push("/admin/variationslist");
    } else {
      // if (!subVariation.name || subVariation._id !== subVariationId) {
      //   dispatch(subVariationDetails(subVariationId));
      // } else {
      //   setName(subVariation.name);
      // }
      dispatch(listSubVariations());
    }
  }, [
    dispatch,
    history,
    variationId,
    variation,
    successUpdate,
    variationDetail,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateVariation({
        _id: variationId,
        name,
        subVariations: subVars,
      })
    );
  };

  return (
    <>
      <Link to="/admin/variationslist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit Variation</h2>
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
              <Form.Label>Select sub variations</Form.Label>
              <Form.Control
                as="select"
                multiple
                onChange={(e) => {
                  const selected = [];
                  for (const item of e.target.selectedOptions) {
                    selected.push(item.value);
                  }
                  setSubVars(selected);
                }}>
                {subVariations.subVariation &&
                  subVariations.subVariation.map((sv) => (
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

export default ProductEditScreen;
