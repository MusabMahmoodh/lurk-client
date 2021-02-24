import React, { useEffect } from "react";

import { Table, Button, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { listAds, deleteAd, createAd } from "../actions/adActions";
import { AD_CREATE_RESET } from "../constants/adConstants";
const AdListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const adList = useSelector((state) => state.adList);
  const { loading, error, ads } = adList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adDelete = useSelector((state) => state.adDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = adDelete;

  const adCreate = useSelector((state) => state.adCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    ad: adCreated,
  } = adCreate;
  useEffect(() => {
    dispatch({ type: AD_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      console.log("created");
      history.push(`/admin/ads/${adCreated._id}/edit`);
    } else {
      dispatch(listAds());
    }
  }, [dispatch, history, successDelete, userInfo, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteAd(id));
    }
  };
  const createAdHandler = () => {
    dispatch(createAd());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Advertisements</h2>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createAdHandler}>
            <i className="fas fa-plus"></i> Add new Advertisement
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
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ads.advertisement &&
                ads.advertisement.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {" "}
                      <Image src={user.image} alt="ad" fluid />
                    </td>

                    <td>
                      <LinkContainer to={`/admin/ads/${user._id}/edit`}>
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

export default AdListScreen;
