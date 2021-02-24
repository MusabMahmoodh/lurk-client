import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { listCategories } from "../actions/categoryActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [image, setImage] = useState({
    name: "",
    data: "",
  });
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [variation, setVariation] = useState("");
  const [subVariation, setSubVariation] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isRecommended, setIsRecommended] = useState(false);
  const [description, setDescription] = useState("");

  const [uploading, setUploading] = useState(false);

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentVariation, setCurrentVariation] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const categoriesList = useSelector((state) => state.categoryList);
  const { categories } = categoriesList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      dispatch(listCategories());

      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setNewPrice(product.newPrice);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setVariation(product.variation);
        setSubVariation(product.subVariation);
        setIsAvailable(product.isAvailable);
        setIsAvailable(product.isRecommended);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  useEffect(() => {
    if (category) {
      setCurrentCategory(categories.category.filter((c) => c._id === category));
      setCurrentVariation("");
      setVariation("");
    }
  }, [category]);
  useEffect(() => {
    if (variation) {
      setCurrentVariation(
        currentCategory[0].variations.filter((c) => c._id === variation)
      );
    }
  }, [variation]);
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
      updateProduct({
        _id: productId,
        name,
        price,
        newPrice,
        image,
        variation,
        subVariation,
        brand,
        category,
        description,
        isAvailable,
        isRecommended,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit Product</h2>
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

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>New Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter new price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}></Form.Control>
            </Form.Group>

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

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAvailable">
              <Form.Label>is Available</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter isAvailable"
                value={isAvailable}
                onChange={(e) => setIsAvailable(e.target.value)}>
                <option value={true}>Available</option>
                <option value={false}>Out of Stock</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="isRecommended">
              <Form.Label>Recommend this?</Form.Label>
              <Form.Control
                as="select"
                value={isRecommended}
                onChange={(e) => setIsRecommended(e.target.value)}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Control>
            </Form.Group>
            <hr></hr>
            <h5>Category selection</h5>
            <Form.Group controlId="category">
              <Form.Label>
                Category<small>(eg:CR,Stationary ...)</small>
              </Form.Label>
              <Form.Group>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option>---</option>
                  {categories.category &&
                    categories.category.map((sv) => (
                      <option value={sv._id}>{sv.name}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Form.Group>
            {currentCategory ? (
              <Form.Group controlId="category">
                <Form.Label>
                  Variation <small>(eg:Single rule, square rule...)</small>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={variation}
                  onChange={(e) => setVariation(e.target.value)}>
                  <option>---</option>
                  {currentCategory[0].variations &&
                    currentCategory[0].variations.map((sv) => (
                      <option value={sv._id}>{sv.name}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
            {currentVariation ? (
              <Form.Group controlId="category">
                <Form.Label>
                  Sub Variation <small>(eg:Blue,120 page , 240 page...)</small>
                </Form.Label>

                <Form.Control
                  as="select"
                  value={subVariation}
                  onChange={(e) => setSubVariation(e.target.value)}>
                  <option>---</option>
                  {currentVariation[0].subVariations &&
                    currentVariation[0].subVariations.map((sv) => (
                      <option value={sv._id}>{sv.name}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
            <hr></hr>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
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
