import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  name: "",
  Price: "",
  DiscountPrice: "",
  description: "",
};

export default function AddFood() {
  const [state, setState] = useState(initialState);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      setAvatar(e.target.files[0]);
    }
    setState({ ...state, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();

      formData.append("avatar", avatar);
      formData.append("name", state.name);
      formData.append("Price", state.Price);
      formData.append("DiscountPrice", state.DiscountPrice);
      formData.append("description", state.description);
      formData.append("user", localStorage.getItem("user_id"));
      
      const res = await axios({
        method: "POST",
        url: "https://food-backend-grng.onrender.com/api/add-food",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res)
      if (res.status === 200) {
        toast.success("Successfully created!");
      } else {
        toast.error("Failed to create an Resturents!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="flex justify-center">
      <Toaster />
        <form className="w-full md:w-[80%] md:flex md:space-x-4 p-4" onSubmit={handleFormSubmit}>
          <div className="flex-col flex space-y-1 mb-4">
            <div
              className="  rounded p-4 "
              style={{
                border: "2px solid #fff7ef ",
              }}
            >
              <img
                className="h-[300px] w-full md:w-[400px] object-fill   "
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "https://th.bing.com/th/id/R.7e6f16a006711b370c53f50bc69e4ccb?rik=7Afd%2f65YHCwLgQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_197311.png&ehk=%2f%2bedqpv8dJFCzMm5dULib%2fsrjtlhKZmLFfzHVo5w9pQ%3d&risl=&pid=ImgRaw&r=0"
                }
              />
            </div>
            <input
              type="file"
              name="avatar"
              onChange={handleChangeInput}
              className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-orange-50 file:text-orange-600
                      hover:file:bg-orange-100 
                     
      "
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Food Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  onChange={handleChangeInput}
                  placeholder="Enter Name"
                  name="name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                  
                 
                >
                  Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="number"
                  placeholder=""
                  name="Price"
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Dicounted Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder=""
                  name="DiscountPrice"
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Description
                </label>
                <textarea
                  className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-text"
                  type="text"
                  placeholder="description put here"
                  name="description"
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <button
              className="middle none center w-full rounded-lg bg-orange-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
