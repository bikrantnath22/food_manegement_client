import react, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import CreateDriver from "./pages/CreateDriver";
import CreateResturent from "./pages/CreateResturent";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import DetailsResturents from "./pages/DetailsResturents";
import DetailsDriver from "./pages/DetailDriver";
import AddFood from "./pages/AddFood";
import ViewFood from "./pages/ViewFood";
import Cart from "./pages/Cart";
import ViewAllFood from "./pages/ViewAllFood";
import OrderUser from "./pages/OrderUser";
import OrderRes from "./pages/OrderRes";
import EditFood from "./pages/EditFood";
import CategoriesWiseRes from "./pages/CategoriesWiseRes";
import OrderDriver from "./pages/OrderDriver";
import Payment from "./pages/payment/Payment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import ViewOrderUser from "./pages/ViewOrder/ViewOrderUser";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchCart } from "./store/cartSlice";
import { Toaster } from "react-hot-toast";
import ViewOrderDriver from "./pages/ViewOrder/ViewOrderDriver";
import ViewOrderRes from "./pages/ViewOrder/ViewOrderRes";
function App() {
  const dispatch = useDispatch();
  const verifyAdmin = () => {
    const role = localStorage.getItem("role");
    return role === "admin" ? true : false;
  };
  const isAuthenticated = () => {
    const isLogged = localStorage.getItem("firstLogin");
    return isLogged ? true : false;
  };
  const verifyRes = () => {
    const role = localStorage.getItem("role");
    return role === "resturent" ? true : false;
  };
  const verifyDriver = () => {
    const role = localStorage.getItem("role");
    return role === "driver" ? true : false;
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://food-backend-grng.onrender.com/user/profile", {
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status == 200) {
          dispatch(fetchCart(res.data.cart));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <Toaster />

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/profile"
            element={
              !isAuthenticated() ? <Navigate to="/login" /> : <Profile />
            }
          />
          <Route
            path="/payment"
            element={
              !isAuthenticated() ? <Navigate to="/login" /> : <Payment />
            }
          />
          <Route
            path="/payment-success"
            element={
              !isAuthenticated() ? <Navigate to="/login" /> : <PaymentSuccess />
            }
          />

          <Route
            path="/food/:id"
            element={
              !isAuthenticated() ? <Navigate to="/login" /> : <ViewFood />
            }
          />
          <Route
            path="/cart"
            element={!isAuthenticated() ? <Navigate to="/login" /> : <Cart />}
          />
          <Route
            path="/order-user"
            element={
              !isAuthenticated() ? <Navigate to="/login" /> : <OrderUser />
            }
          />
          <Route
            path="/cat-res/:id"
            element={
              !isAuthenticated() ? (
                <Navigate to="/login" />
              ) : (
                <CategoriesWiseRes />
              )
            }
          />
          <Route
            path="/view-order-user/:id"
            element={
              !isAuthenticated() ? (
                <Navigate to="/login" />
              ) : (
                <ViewOrderUser />
              )
            }
          />
          <Route
            path="/view-order-driver/:id"
            element={
              !isAuthenticated() ? (
                <Navigate to="/login" />
              ) : (
                <ViewOrderDriver/>
              )
            }
          />
          <Route
            path="/view-order-res/:id"
            element={
              !isAuthenticated() ? (
                <Navigate to="/login" />
              ) : (
                <ViewOrderRes />
              )
            }
          />
          

          <Route
            path="/create-driver"
            element={
              verifyAdmin() && isAuthenticated() ? (
                <CreateDriver />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-food"
            element={
              verifyRes() && isAuthenticated() ? (
                <AddFood />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/view-order-driver"
            element={
              verifyDriver() && isAuthenticated() ? (
                <ViewOrderDriver />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit-food/:id"
            element={
              verifyRes() && isAuthenticated() ? (
                <EditFood />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/view-all-food"
            element={
              verifyRes() && isAuthenticated() ? (
                <ViewAllFood />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/order-res"
            element={
              verifyRes() && isAuthenticated() ? (
                <OrderRes />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/category"
            element={
              verifyAdmin() && isAuthenticated() ? (
                <Category />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/create-res"
            element={
              verifyAdmin() && isAuthenticated() ? (
                <CreateResturent />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/resturents"
            element={
              verifyAdmin() && isAuthenticated() ? (
                <DetailsResturents />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/driver"
            element={
              verifyAdmin() && isAuthenticated() ? (
                <DetailsDriver />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/order-driver"
            element={
              verifyDriver() && isAuthenticated() ? (
                <OrderDriver />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
