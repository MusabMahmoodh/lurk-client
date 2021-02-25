import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  listVariations,
  deleteVariation,
  createVariations,
} from "../actions/variations";
import { VARIATION_CREATE_RESET } from "../constants/variationsConst";
const VariationsListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const variationsList = useSelector((state) => state.variationsList);
  const { loading, error, variations } = variationsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const variationsDelete = useSelector((state) => state.variationsDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = variationsDelete;

  const variationsCreate = useSelector((state) => state.variationsCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    variation: createdVariation,
  } = variationsCreate;
  useEffect(() => {
    dispatch({ type: VARIATION_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/owowon");
    }

    if (successCreate) {
      console.log("created");
      history.push(`/admin/variation/${createdVariation._id}/edit`);
    } else {
      dispatch(listVariations());
    }
  }, [
    dispatch,
    history,
    successDelete,
    userInfo,
    successCreate,
    createdVariation,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteVariation(id));
    }
  };
  const createVariationHandler = () => {
    dispatch(createVariations());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Variations</h2>
          <small>Eg: Single rule,Square rule</small>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createVariationHandler}>
            <i className="fas fa-plus"></i> Add new Variation
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>SubVars</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {variations.variations &&
                variations.variations.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      {user.subVariations &&
                        user.subVariations.map((vari) => (
                          <>
                            <small>{vari.name}</small>
                            <br></br>
                          </>
                        ))}
                    </td>
                    <td>
                      {userInfo.isAdmin ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/variation/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
            {/* {console.log(variations)} */}
          </Table>
        </>
      )}
    </>
  );
};

export default VariationsListScreen;
