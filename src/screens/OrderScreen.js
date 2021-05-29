import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

// import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  //   payOrder,
  deliverOrder,
  cancelOrder,
  holdOrder,
  delayOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  //   const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/owowon");
    }

    // const addPayPalScript = async () => {
    //   const { data: clientId } = await axios.get("${SERVER_URL}/api/config/paypal");
    //   const script = document.createElement("script");
    //   script.type = "text/javascript";
    //   script.src = `https://www.paypal.com/sdk/js?client-id=Rs.{clientId}`;
    //   script.async = true;
    //   script.onload = () => {
    //     setSdkReady(true);
    //   };
    //   document.body.appendChild(script);
    // };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
    // else if (!order.isPaid) {
    //   if (!window.paypal) {
    //     addPayPalScript();
    //   } else {
    //     setSdkReady(true);
    //   }
    // }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  //   const successPaymentHandler = (paymentResult) => {
  //     console.log(paymentResult);
  //     dispatch(payOrder(orderId, paymentResult));
  //   };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    alert("Successfully delivered");
    history.push("/admin/orderlist");
  };
  const deliverCancelHandler = () => {
    dispatch(cancelOrder(order));
    alert("Order cancelled");
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(getOrderDetails(orderId));
    history.push("/admin/orderlist");
  };
  const deliverHoldHandler = () => {
    dispatch(holdOrder(order));
    alert("Order on hold");
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(getOrderDetails(orderId));
    history.push("/admin/orderlist");
  };
  const deliverDelayHandler = () => {
    dispatch(delayOrder(order));
    alert("Delivery delayed");
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(getOrderDetails(orderId));
    history.push("/admin/orderlist");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <button onClick={handlePrint}>Print this out!</button>
      <div className="my-3" ref={componentRef}>
        <h2>
          Order :<small>{order._id}</small>
        </h2>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.shippingAddress.name}
                </p>
                <p>
                  <strong>Email: </strong>{" "}
                  <a href={`mailto:Rs.{order.shippingAddress.email}`}>
                    {order.shippingAddress.email}
                  </a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address},
                </p>
                <p>
                  <strong>Nearest Landmark: </strong>
                  {order.shippingAddress.nearestLandMark},
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on:
                    <br />
                    Date: {order.deliveredAt.split("T")[0]}
                    {"  Time:"}
                    {order.deliveredAt.split("T")[1].split("Z")[0]}
                  </Message>
                ) : order.isCancelled ? (
                  <Message variant="danger">Order is Cancelled</Message>
                ) : (
                  <Message variant="danger">Not delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {/* {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )} */}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1} xs={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/Rs.{item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4} xs={3}>
                            {item.qty} x Rs.{item.price} = Rs.{" "}
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>Rs.{order.itemsPrice}.00</Col>
                  </Row>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs.{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item> */}
                <ListGroup.Item>
                  {/* <Row>
                  <Col>Tax</Col>
                  <Col>Rs.{order.taxPrice}</Col>
                </Row> */}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>Rs.{order.totalPrice}.00</Col>
                  </Row>
                </ListGroup.Item>
                {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />} */}
                {/* {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )} */}
                {/* </ListGroup.Item>
              )} */}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  //order.isPaid &&
                  !order.isDelivered &&
                  !order.isCancelled && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block btn-success"
                        onClick={deliverHandler}>
                        Mark As Delivered
                      </Button>

                      <Button
                        type="button"
                        className="btn btn-block btn-danger"
                        onClick={deliverCancelHandler}>
                        Mark As Cancelled
                      </Button>
                      {!order.isHold && (
                        <Button
                          type="button"
                          className="btn btn-block btn-warning"
                          onClick={deliverHoldHandler}>
                          Mark As On hold
                        </Button>
                      )}
                      {!order.isDelayed && (
                        <Button
                          type="button"
                          className="btn btn-block btn-info"
                          onClick={deliverDelayHandler}>
                          Mark As Will be delayed
                        </Button>
                      )}
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderScreen;
