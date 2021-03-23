import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/layout/Header";

import CircleMenu from "./components/utils/CircleMenu";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import AdListScreen from "./screens/AdListScreen";
import AdEditScreen from "./screens/AdEditScreen";
import SubVariationsListScreen from "./screens/SubVariationsListScreen";
import SubVariationsEditScreen from "./screens/SubVariationsEditScreen";
import VariationsListScreen from "./screens/VaraiationListScreen";
import VariationsEditScreen from "./screens/VariationsEditScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import CategoryEditScreen from "./screens/CategoryEditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/OrderListScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import PagePreLoader from "../src/components/PagePreLoader";
import { useEffect, useState } from "react";

function App() {
  const [enter, setEnter] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnter(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-body">
      {enter && <PagePreLoader />}

      <Router>
        <Header position="sticky" />

        <main className="container m-auto pb-5">
          <CircleMenu />
          <Route path="/owowon" component={LoginScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />

          {/* Admin routes */}
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />

          <Route
            exact
            path="/admin/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route exact path="/admin/orderlist" component={OrderListScreen} />

          <Route
            path="/admin/subvariationslist"
            component={SubVariationsListScreen}
            exact
          />
          <Route
            path="/admin/subvariation/:id/edit"
            component={SubVariationsEditScreen}
            exact
          />
          <Route path="/admin/adslist" component={AdListScreen} exact />
          <Route path="/admin/ads/:id/edit" component={AdEditScreen} exact />
          <Route
            path="/admin/variationslist"
            component={VariationsListScreen}
            exact
          />
          <Route
            path="/admin/variation/:id/edit"
            component={VariationsEditScreen}
            exact
          />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route
            path="/admin/categorylist"
            component={CategoryListScreen}
            exact
          />
          <Route
            path="/admin/category/:id/edit"
            component={CategoryEditScreen}
            exact
          />
          <Route path="/order/:id" component={OrderScreen} exact />
        </main>
      </Router>
    </div>
  );
}

export default App;
