import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  listSubVariations,
  deleteSubVariation,
  createSubVariations,
} from "../actions/subVariations";
import { SUBVARIATION_CREATE_RESET } from "../constants/subVariationsConstants.js";
const SubVariationsListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const subVariationsList = useSelector((state) => state.subVariationsList);
  const { loading, error, subVariations } = subVariationsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subVariationsDelete = useSelector((state) => state.subVariationsDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = subVariationsDelete;

  const subVariationsCreate = useSelector((state) => state.subVariationsCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    subVariation: createdSubVariation,
  } = subVariationsCreate;
  useEffect(() => {
    dispatch({ type: SUBVARIATION_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      console.log("created");
      history.push(`/admin/subvariation/${createdSubVariation._id}/edit`);
    } else {
      dispatch(listSubVariations());
    }
  }, [dispatch, history, successDelete, userInfo, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteSubVariation(id));
    }
  };
  const createSubVariationHandler = () => {
    dispatch(createSubVariations());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Sub Variations</h2>
          <small>Eg: 120page,blue....</small>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createSubVariationHandler}>
            <i className="fas fa-plus"></i> Add new Sub Variation
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
                <th>ID</th>
                <th>NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subVariations.subVariation &&
                subVariations.subVariation.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
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
                      <LinkContainer
                        to={`/admin/subvariation/${user._id}/edit`}>
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
          </Table>
        </>
      )}
    </>
  );
};

export default SubVariationsListScreen;
