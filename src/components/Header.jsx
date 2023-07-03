import React, { useRef, useState, useEffect, useCallback } from "react";

import axios from "axios";
import "./style.css";
import {
  HomeOutlined,
  ContactsFilled,
  LoginOutlined,
  LogoutOutlined,
  PicRightOutlined,
  BookFilled,
  UserOutlined,
  PlusSquareOutlined,
  PlusOutlined,
  NotificationOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import NavBtns from "./NavBtns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/******************************************************************************************/

export default function Header() {
  const hamburgerRef = useRef(null);
  const mobileViewRef = useRef(null);
  const cart = useSelector((state) => state.cart);
  const [mobileWidth, setMobileWidth] = useState(0);

  const loggedIn = localStorage.getItem("firstLogin");

  const verifyAdmin = () => {
    const role = localStorage.getItem("role");
    return role === "admin" ? true : false;
  };
  const verifyRes = () => {
    const role = localStorage.getItem("role");
    return role === "resturent" ? true : false;
  };
  const verifyUser = () => {
    const role = localStorage.getItem("role");
    return role === "user" ? true : false;
  };
  const verifyDriver = () => {
    const role = localStorage.getItem("role");
    return role === "driver" ? true : false;
  };

  const userType = () => {
    return localStorage.getItem("role");
  };

  const logoutUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://food-backend-grng.onrender.com/user/logout", {
        headers: {
         
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        localStorage.removeItem("firstLogin");
        localStorage.removeItem("user_id");
        localStorage.removeItem("role");
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    if (dimensions.width >= 768) {
      mobileViewRef.current.classList.remove("animate-mobile-nav-close");
      mobileViewRef.current.classList.remove("animate-mobile-nav-open");
      hamburgerRef.current.classList.remove("open");
      mobileViewRef.current.classList.add("hide");
    }
  }, [dimensions.width]);
  console.log(mobileWidth);
  const handleCloseNavigation = () => {
    hamburgerRef.current.classList.remove("open");
    mobileViewRef.current.classList.add("animate-mobile-nav-close");
    mobileViewRef.current.classList.remove("animate-mobile-nav-open");
  };
  const toggleHamburger = () => {
    if (hamburgerRef === null) return; // ref is not initialised
    if (hamburgerRef.current.classList.contains("open")) {
      hamburgerRef.current.classList.remove("open");
      mobileViewRef.current.classList.add("animate-mobile-nav-close");
      mobileViewRef.current.classList.remove("animate-mobile-nav-open");

      return;
    }
    hamburgerRef.current.classList.add("open");
    mobileViewRef.current.classList.remove("hide");
    mobileViewRef.current.classList.add("animate-mobile-nav-open");
    mobileViewRef.current.classList.remove("animate-mobile-nav-close");
  };

  return (
    <>
      {/* ************************************************************************************ */}
      {/* DESKTOP  */}
      <div className="h-16">
        <nav className="z-30 fixed h-16 bg-gray-50 shadow-md px-7 items-center md:flex justify-between hidden w-screen ">
          {/* {Left part} */}
          {/* Anything to display in left most part of Navbar for desktop view change the following  */}

          <div className=" p-2 rounded-sm text-orange-600 text-3xl font-mono font-bold">
            <Link to="/">Food Manegement</Link>
          </div>

          <div className="flex space-x-4 items-center">
            {/* Right part  */}
            {/* Anything to display in right most part of Navbar for desktop view change the following  */}

            <></>

            {loggedIn ? (
              <>
                <div className=" p-2 font-semibold rounded-sm text-slate-600">
                  <Link to="/profile">
                    <NavBtns icon={<UserOutlined />} title={"Profile"} />
                  </Link>
                </div>

                {verifyAdmin() ? (
                  <div className=" p-2 font-semibold rounded-sm text-slate-600">
                    <Link to="/driver">
                      <NavBtns icon={<PlusOutlined />} title={"Drivers"} />
                    </Link>
                  </div>
                ) : null}
                {verifyAdmin() ? (
                  <div className=" p-2 font-semibold rounded-sm text-slate-600  ">
                    <Link to="/resturents">
                      <NavBtns icon={<PlusOutlined />} title={" Resturents"} />
                    </Link>
                  </div>
                ) : null}
                {verifyAdmin() ? (
                  <div className=" p-2 font-semibold rounded-sm text-slate-600  ">
                    <Link to="/category">
                      <NavBtns icon={<PlusOutlined />} title={"Category"} />
                    </Link>
                  </div>
                ) : null}
                {verifyRes() ? (
                  <div className=" p-2 font-semibold rounded-sm text-slate-600  ">
                    <Link to="/view-all-food">
                      <NavBtns icon={<PlusOutlined />} title={"View Foods"} />
                    </Link>
                  </div>
                ) : null}
                {verifyRes() ? (
                  <div className=" p-2 font-semibold rounded-sm text-slate-600  ">
                    <Link to="/order-res">
                      <NavBtns
                        icon={<NotificationOutlined />}
                        title={"Order Details"}
                      />
                    </Link>
                  </div>
                ) : null}
                {verifyUser() ? (
                  <div className=" p-2 font-semibold rounded-sm text-slate-600  ">
                    <Link to="/order-user">
                      <NavBtns
                        icon={<NotificationOutlined />}
                        title={"Order Details"}
                      />
                    </Link>
                  </div>
                ) : null}
                {verifyDriver() ? (
                  <div className=" p-2 font-semibold rounded-sm text-slate-600  ">
                    <Link to="/order-driver">
                      <NavBtns
                        icon={<NotificationOutlined />}
                        title={"Order Details"}
                      />
                    </Link>
                  </div>
                ) : null}

                <div className="p-2 font-semibold rounded-sm text-slate-600 ">
                  <button onClick={logoutUser}>
                    <NavBtns icon={<LogoutOutlined />} title={"Log out"} />
                  </button>
                </div>
                {
                  verifyUser() ? (
                    <div className="p-2 font-semibold rounded-sm text-slate-600 ">
                  <span className="cart-icon">{cart.length}</span>
                  <Link to="/cart">
                    <ShoppingCartOutlined
                     className="text-2xl"
                    
                    />
                  </Link>
                </div>
                  ):null
                }
                
              </>
            ) : (
              <>
                <div className=" p-2 font-semibold rounded-sm text-slate-600">
                  <Link to="/">
                    <NavBtns icon={<HomeOutlined />} title={"Home"} />
                  </Link>
                </div>
                <div className=" p-2 font-semibold rounded-sm text-slate-600">
                  <Link to="/login">
                    <NavBtns icon={<LoginOutlined />} title={"Login"} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* ALL THE NAV RELATED TO DESKTOP VIEW WILL BE DISPLAYED  */}

      {/* ******************************************************************************** */}

      {/* MOBILE */}
      <div className="mb-1 overflow-x-hidden  md:mb-0">
        <nav className=" h-[60px] overflow-x-hidden  md:hidden bg-orange-600 w-full z-30  flex  fixed top-0   ">
          <div className="flex py-5 w-full items-center ml-2 space-x-2 ">
            <div ref={hamburgerRef} id="nav-icon1" onClick={toggleHamburger}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between w-full">
              <div className=" rounded-sm text-2xl text-white font-bold">
                <Link to="/">Food Manegement</Link>
              </div>
              <div className="p-2 font-semibold rounded-sm text-slate-600 mr-2">
                <Link to="/cart">
                  <ShoppingCartOutlined
                    style={{
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                  <span className="cart-icon-mobile">{cart.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div
          ref={mobileViewRef}
          className=" z-10 md:hidden top-[60px] min-h-[100vh] flex w-full   absolute hide"
        >
          {/* {main content to be displayed} */}
          {/* ANYTHING THAT NEEDS TO BE SHOWN IN MOBILE VIEW ADD BELOW  */}

          <>
            <div className=" space-y-4  w-[80%] p-2 bg-gray-200  min-h-[100vh] overflow-x-hidden  ">
              {loggedIn ? (
                <>
                  <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                    <Link to="/profile">Profile</Link>
                  </div>

                  {verifyAdmin() ? (
                    <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                      <Link to="/driver">Driver</Link>
                    </div>
                  ) : null}
                  {verifyAdmin() ? (
                    <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                      <Link to="/resturents">Restaurants</Link>
                    </div>
                  ) : null}
                  {verifyAdmin() ? (
                    <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                      <Link to="/category">Category</Link>
                    </div>
                  ) : null}
                  {verifyRes() ? (
                    <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                      <Link to="/view-all-food">View Food</Link>
                    </div>
                  ) : null}
                  {verifyRes() ? (
                    <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                      <Link to="/order-res">Order Details</Link>
                    </div>
                  ) : null}

                  {verifyUser() ? (
                    <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                      <Link to="/order-user">Order Details</Link>
                    </div>
                  ) : null}
                  {verifyDriver() ? (
                    <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                      <Link to="/order-driver">Order Details</Link>
                    </div>
                  ) : null}
                  <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600 ">
                    <button onClick={logoutUser}>Logout</button>
                  </div>
                </>
              ) : (
                <div className="bg-gray-100 h-[50px] p-2 font-semibold rounded-sm text-slate-600">
                  <Link to="/login">Login</Link>
                </div>
              )}
            </div>

            <div
              className="w-[20%] bg-slate-400 opacity-50"
              onClick={handleCloseNavigation}
            ></div>
          </>
        </div>
      </div>

      {/* ******************************************************************************** */}
    </>
  );
}
