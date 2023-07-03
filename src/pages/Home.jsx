import Slide from "../components/Carousel";
import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [resturents, setResturents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  const verifyResturent = () => {
    const role = localStorage.getItem("role");
    return role === "resturent" ? true : false;
  };

  const verifyAdmin = () => {
    const role = localStorage.getItem("role");
    return role === "admin" ? true : false;
  };

  const verifyUser = () => {
    const role = localStorage.getItem("role");
    return role === "user" ? true : false;
  };
  const verifyDriver = () => {
    const role = localStorage.getItem("role");
    return role === "driver" ? true : false;
  };

  var reversRes = resturents.slice().reverse();

  const getResturents = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const res = await axios.get("https://food-backend-grng.onrender.com/api/resturents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    setResturents(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getResturents();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("https://food-backend-grng.onrender.com/api/category");
      console.log(res.data);
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);
  return (
    <>
      <div className="w-full flex justify-center items-center p-4">
        <div className="w-full md:w-[90%] flex justify-center">
          <Slide />
        </div>
      </div>
      <div>
        {verifyResturent() || verifyDriver() ? null : (
          <div className="flex justify-center">
            <div className="w-[80%]">
              <p className="capitalize text-gray-600 font-semibold italic text-xl">
                Categories
              </p>
              <div className="grid grid-cols-3 lg:grid-cols-8 md:grid-cols-5 gap-4 p-4">
                {categories &&
                  categories.map((res) => {
                    return (
                      <div className="flex flex-col justify-center items-center">
                        <Link to={`/cat-res/${res._id}`}>
                          <img
                            className="w-24 h-24 rounded-full"
                            src={res?.avatar?.download_url}
                          />
                        </Link>

                        <p className="capitalize text-gray-600 font-semibold italic">
                          {res.name}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
      {verifyResturent() || verifyDriver() ? null : (
        <div className="flex justify-center">
          <div className="md:w-[80%] w-[95%]">
            <p className="capitalize text-gray-600 font-semibold italic text-xl">
              Resturents
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4">
              {reversRes &&
                reversRes.map((res) => {
                  return (
                    <div className=" justify-center ">
                      <div class="block rounded-lg shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] dark:bg-neutral-100">
                        <div
                          class="relative overflow-hidden bg-cover bg-no-repeat"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          <img
                            class="rounded-t-lg h-[150px] w-full cursor-pointer object-cover"
                            src={res?.avatar?.download_url}
                            alt=""
                          />
                          <Link to={`/food/${res._id}`}>
                            <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                          </Link>
                        </div>
                        <div class="p-4 w-full">
                          <h5 class="mb-2 text-lg  font-medium  text-neutral-200 dark:text-neutral-700 capitalize">
                            {res?.name}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center text-xl text-gray-500">
        {verifyResturent() ? <div>i am Resturent</div> : null}
      </div>
      <div className="flex justify-center text-xl text-gray-500">
        {verifyDriver() ? <div>i am Delivery Excucative</div> : null}
      </div>
    </>
  );
}
