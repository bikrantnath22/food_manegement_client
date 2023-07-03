import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  name: "",
  role: "resturent",
  email: "",
  password: "",
  address: "",
  category: "",
};

function CreateResturent() {
  const [state, setState] = useState(initialState);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
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
      formData.append("email", state.email);
      formData.append("password", state.password);
      formData.append("address", state.address);
      formData.append("phone", state.phone);
      formData.append("role", state.role);
      formData.append("category", state.category);
      console.log(formData)
      const res = await axios({
        method: "POST",
        url: "https://food-backend-grng.onrender.com/api/add-res",
        data: formData,
        
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        
      });
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
  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("https://food-backend-grng.onrender.com/api/category");

      setOptions(res.data);
      console.log(res.data);
    };

    getCategory();
  }, [callback]);

  return (
    <>
      <div className="flex justify-center">
        <Toaster />
        <form
          className="w-full md:w-[80%] md:flex md:space-x-4 p-4"
          onSubmit={handleFormSubmit}
        >
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
                    : "https://creativevip.net/resource-images/16-restaurant-icons-3.png"
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
                  Resturent Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
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
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Phone
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="number"
                  placeholder="Enter Phone"
                  name="phone"
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
                  Address
                </label>
                <textarea
                  className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-text"
                  type="text"
                  placeholder="Location put here"
                  name="address"
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
                  Category
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={state.options}
                  onChange={handleChangeInput}
                  name="category"
                >
                <option>Select category</option>
                  {options.map((option) => {
                    return (
                      
                      <option key={option.id} value={option._id}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
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

export default CreateResturent;
