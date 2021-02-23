import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { updateAd, AdDetails, listAds } from "../actions/adActions";
import { AD_UPDATE_RESET } from "../constants/adConstants";

const ProductEditScreen = ({ match, history }) => {
  const adId = match.params.id;

  const [image, setImage] = useState({
    name: "",
    data: "",
  });
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const adDetail = useSelector((state) => state.adDetails);
  const { loading, error, ad } = adDetail;

  const adUpdate = useSelector((state) => state.adUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: AD_UPDATE_RESET });
      history.push("/admin/adslist");
    } else {
      if (ad._id !== adId) {
        dispatch(AdDetails(adId));
      } else {
        setImage(ad.image);
      }
    }
  }, [dispatch, history, adId, ad, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var encoded = reader.result;
        setImage({ name: file.name, data: encoded });
      };
    }
    setUploading(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAd({
        _id: adId,
        image,
      })
    );
  };

  return (
    <>
      <Link to="/admin/adslist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Ads</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>

              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
              <small>{image.name}</small>
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
