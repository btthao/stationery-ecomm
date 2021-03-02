import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./Components/style/globalStyles";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Homepage from "./Components/homepage/Homepage";
import ProductPage from "./Components/single product/ProductPage";
import AllProducts from "./Components/all products page/AllProducts";
import AboutUs from "./Components/about us/AboutUs";
import Checkout from "./Components/checkout/Checkout";
import ScrollTop from "./Components/ScrollTop";
import Subscribe from "./Components/Subscribe";
import Contact from "./Components/contact/Contact";
import User from "./Components/user/User";
import Login from "./Components/user/Login";
import { useProductsContext } from "./Components/context";
import { auth } from "./firebase";

function App() {
  const [{ user, basket }, dispatch] = useProductsContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    dispatch({
      type: "SHOW_OLD_BASKET",
      payload: localStorage.getItem("statineBasket")
        ? JSON.parse(localStorage.getItem("statineBasket"))
        : [],
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("statineBasket", JSON.stringify(basket));
    }
  }, [basket]);

  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <ScrollTop>
        <Switch>
          <Route exact path="/checkout">
            <Checkout />
          </Route>{" "}
          <Route exact path="/user">
            <User />
          </Route>{" "}
          <Route exact path="/login">
            <Login />
          </Route>{" "}
          <Fragment>
            <Route exact path="/">
              <Homepage />
            </Route>{" "}
            <Route exact path="/about">
              <AboutUs />
            </Route>{" "}
            <Route exact path="/products">
              <AllProducts />
            </Route>{" "}
            <Route exact path="/contact">
              <Contact />
            </Route>{" "}
            <Route exact path="/products/:id">
              <ProductPage />
            </Route>{" "}
            <Subscribe />
            <Footer />
          </Fragment>{" "}
        </Switch>{" "}
      </ScrollTop>{" "}
    </Router>
  );
}

export default App;
