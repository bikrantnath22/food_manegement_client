import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementCart, decrementCart, removeCart } from "../api/cart/index";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
export default function Cart() {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  function handleIncrement(data) {
    dispatch(incrementCart(data));
  }
  function handleDecrement(data) {
    if (cart.find((c) => data._id == c.food._id).count == 1) {
      dispatch(removeCart(data));
    } else dispatch(decrementCart(data));
  }
  function handleNavigatePayment() {
    if (cart.length == 0) {
      return toast.error("Cart is empty");
    }
    if (address == "") {
      return toast.error("address is empty");
    }
    if (phone == "") {
      return toast.error("Phone is Empty");
    }
    return navigate("/payment", {
      replace: true,
      state: {
        cart: cart,
        address: address,
        phone: phone,
        total: total,
        totalDiscount: discount,
      },
    });
  }
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, cartItem) => {
        if (cartItem.food) {
          return prev + cartItem.food.DiscountPrice * cartItem.count;
        }
      }, 0);
      const dis = cart.reduce((prev, cartItem) => {
        if (cartItem.food) {
          return prev + cartItem.food.Price * cartItem.count;
        }
      }, 0);
      setTotal(total);
      setDiscount(Math.abs(total - dis));
    };
    getTotal();
  }, [cart]);

  return (
    <div>
      <div className="  pt-4">
        <h1 className="mb-4 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 flex flex-col-reverse  md:flex-row md:flex md:space-x-6 xl:px-0 ">
          <div className="overflow-auto md:h-[70vh] md:w-[70%]">
            <div className="rounded-lg md:w-full">
              {cart.map((c) => (
                <div
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  key={c._id}
                >
                  <img
                    src={c.food.avatar.download_url}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {c.food.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {c.food.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-700">
                        Rs : <del className="text-red-500">{c.food.Price}</del>
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-700">
                        Rs :{" "}
                        <span className="text-green-500 ">
                          {c.food.DiscountPrice}
                        </span>
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => handleDecrement(c.food)}
                          className="cursor-pointer rounded-l bg-gray-100 py-2 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <span className="py-2 px-3 border-[1px] border-gray-200 text-sm">
                          {c.count}
                        </span>
                        <span
                          onClick={() => handleIncrement(c.food)}
                          className="cursor-pointer rounded-r bg-gray-100 py-2 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 "
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-lg font-bold text-gray-600">
                          Rs. {c.food.DiscountPrice * c.count}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="">
              <div className="mb-2 flex justify-between">
                <div className="w-full">
                  <div className="relative w-full min-w-[200px]">
                    <textarea
                      onChange={(e) => setAddress(e.target.value)}
                      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent shadow-md bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                    ></textarea>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Address
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full">
                  <div className="relative w-full min-w-[200px]">
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      className="peer h-full w-full resize-none rounded-[7px] border border-blue-gray-400 shadow-md bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-400"
                      placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Phone
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <p className="text-gray-700">Total Discount</p>
                <p className="text-red-500 text-md font-semibold">
                  ₹ {discount}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-xl font-bold">Rs {total}</p>
                </div>
              </div>

              <button
                onClick={handleNavigatePayment}
                className="mt-6 w-full rounded-md bg-orange-500 py-1.5 font-medium text-blue-50 hover:bg-orange-600"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
