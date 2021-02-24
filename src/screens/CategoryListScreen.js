import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  listCategories,
  deleteCategory,
  createCategory,
} from "../actions/categoryActions";
import { CATEGORY_CREATE_RESET } from "../constants/categoryConstants";
const CategoryListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.categoryList);

  const { loading, error, categories } = categoriesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const categoryDelete = useSelector((state) => state.categoryDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;
  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      console.log("created");
      history.push(`/admin/category/${createdCategory._id}/edit`);
    } else {
      dispatch(listCategories());
    }
  }, [
    dispatch,
    history,
    successDelete,
    userInfo,
    successCreate,
    createdCategory,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCategory(id));
    }
  };
  const createCategoryHandler = () => {
    dispatch(createCategory());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Catagories</h2>
          <small>Eg: CR,Exercise,PaperStat...</small>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createCategoryHandler}>
            <i className="fas fa-plus"></i> Add new Category
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
                <th>Variations</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.category &&
                categories.category.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>

                    <td>
                      {user.variations &&
                        user.variations.map((vari) => (
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
                      <LinkContainer to={`/admin/category/${user._id}/edit`}>
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

export default CategoryListScreen;
