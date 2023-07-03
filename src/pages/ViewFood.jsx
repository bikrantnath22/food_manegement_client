import react, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToCart,
  incrementCart,
  decrementCart,
  removeCart,
} from "../api/cart/index";
import { useSelector } from "react-redux";
export default function ViewFood() {
  const { id } = useParams();
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();




  function handleAddToCart(data) {
    console.log("clicked");
    dispatch(addToCart(data));
  }
  function handleIncrement(data) {
    dispatch(incrementCart(data));
  }
  function handleDecrement(data) {
    if (cart.find((c) => data._id == c.food._id).count == 1) {
      dispatch(removeCart(data));
    } else dispatch(decrementCart(data));
  }
  const getaRes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`https://food-backend-grng.onrender.com/user/userByid/${id}`, {
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    setState(res.data);
    setLoading(false);
  };
 

  useEffect(() => {
    getaRes();
  }, []);
  return (
    <div className="">
      <div className="flex flex-col justify-center m-auto p-4 md:w-[50%]">
        <div className="flex bg-stone-50 p-6  shadow-md mt-2 mb-2  ">
          <img
            className="h-28 w-28 rounded-md"
            src={state?.avatar?.download_url}
          />

          <div className="flex flex-col ml-4 ">
            <p className="text-gray-500 text-md mb-2">
              <span className=" text-[20px]  text-gray-600 font-bold capitalize">
                {state?.name}
              </span>
            </p>
            <p className="text-gray-500 text-sm mb-2">
              Phone :
              <span className=" text-md text-orange-500 font-semibold capitalize">
                {state?.phone}
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              Address :
              <span className=" text-md text-gray-700 font-semibold capitalize">
                {state?.address}
              </span>
            </p>
          </div>
        </div>
        <div className="text-xl font-semibold text-gray-600">Items</div>
        {state &&
          state.food.map((data) => {
            return (
              <div
                key={data._id}
                class="justify-between mb-2 rounded-lg bg-white p-4 mt-2 shadow-md sm:flex sm:justify-start"
              >
                <img
                  className="h-24 w-24 rounded-md"
                  src={data?.avatar.download_url}
                />
                <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg  text-gray-600 font-bold capitalize">
                      {data?.name}
                    </h2>
                    <p class="mt-1 text-xs text-gray-700">
                      {data?.description}
                    </p>
                  </div>
                  <div class="mt-4 flex  sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div class="flex items-center border-gray-100">
                      {cart.find((c) => c.food._id === data._id) ? (
                        <div className="flex item-center">
                          <span
                            class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-orange-500 hover:text-orange-50"
                            onClick={() => handleDecrement(data)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <span className="py-2 px-3 border-[1px] border-gray-200">
                            {cart.find((c) => c.food._id == data._id).count}
                          </span>

                          <span
                            class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-orange-500 hover:text-orange-50"
                            onClick={() => handleIncrement(data)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(data)}
                          className="border-[1px] border-orange-300 text-sm font-mono w-32 py-2 rounded-md shadow-md text-orange-400 font-semibold"
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                    <div className="flex">
                      
                      <div class="flex items-center mr-2">
                        <p class="text-lg text-gray-500 font-bold">
                          Rs.{" "}
                          <span className="font-bold">
                            {data?.DiscountPrice}
                          </span>
                        </p>
                      </div>
                      <div class="flex items-center ">
                        <p class="text-sm text-red-500">
                          Rs .<del className="text-red-500">{data?.Price}</del>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
