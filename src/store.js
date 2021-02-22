import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  // productReviewCreateReducer,
  // productTopRatedReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  SubVariationListReducer,
  SubVariationsDetailsReducer,
  SubVariationsDeleteReducer,
  SubVariationsCreateReducer,
  SubVariationsUpdateReducer,
} from "./reducers/subVariationsReducers";
import {
  variationListReducer,
  variationsDetailsReducer,
  variationsDeleteReducer,
  variationsCreateReducer,
  variationsUpdateReducer,
} from "./reducers/variationsReducers";
import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
} from "./reducers/categoryReducers";

// import {
//     orderCreateReducer,
//     orderDetailsReducer,
//     orderPayReducer,
//     orderListMyReducer,
//     orderListReducer,
//     orderDeliverReducer,
// } from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,

  variationsList: variationListReducer,
  variationsDetails: variationsDetailsReducer,
  variationsDelete: variationsDeleteReducer,
  variationsCreate: variationsCreateReducer,
  variationsUpdate: variationsUpdateReducer,
  subVariationsList: SubVariationListReducer,
  subVariationsDetails: SubVariationsDetailsReducer,
  subVariationsDelete: SubVariationsDeleteReducer,
  subVariationsCreate: SubVariationsCreateReducer,
  subVariationsUpdate: SubVariationsUpdateReducer,
  // productReviewCreate: productReviewCreateReducer,
  // productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  // orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  // orderListMy: orderListMyReducer,
  // orderList: orderListReducer,
  // orderDeliver: orderDeliverReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
