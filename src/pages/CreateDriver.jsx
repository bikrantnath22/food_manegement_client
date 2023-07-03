import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  name: "",
  role: "driver",
  email: "",
  password: "",
  address: "",
};

function CreateDriver() {
  const [state, setState] = useState(initialState);
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [callback, setCallback] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      setAvatar(e.target.files[0]);
    }
    if (name === "image") {
      setImage(e.target.files[0]);
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
      formData.append("image", image);
      const res = await axios({
        method: "POST",
        url: "https://food-backend-grng.onrender.com/api/add-driver",
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

  return (
    <>
      <div className="flex justify-center">
        <Toaster />
        <form
          className="w-full md:w-[80%] md:flex md:space-x-4 p-4"
          onSubmit={handleFormSubmit}
        >
          <div className="flex-col flex space-y-1 mb-4">
            <p className="text-md font-semibold text-stone-500">
              Image of Driver
            </p>
            <div
              className="  rounded p-4  md:flex justify-between items-center "
              style={{
                border: "2px solid #fff7ef ",
              }}
            >
              <img
                className="h-[130px] w-full md:w-[200px] object-fill   "
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "https://www.webhostingworld.net/img/pages/personal_domains.png"
                }
              />
              <input
                type="file"
                name="avatar"
                onChange={handleChangeInput}
                className="block w-[50%] text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-orange-50 file:text-orange-600
                      hover:file:bg-orange-100 
      "
              />
            </div>
            <p className="text-md font-semibold text-stone-500">
              Image of Documents
            </p>
            <div
              className="  rounded p-4  md:flex justify-between items-center "
              style={{
                border: "2px solid #fff7ef ",
              }}
            >
              <img
                className="h-[130px] w-full md:w-[200px] object-fill   "
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "https://th.bing.com/th/id/OIP.X8Y_ml41vu1bnK1B-ySIrQHaGm?pid=ImgDet&w=612&h=546&rs=1"
                }
              />
              <input
                type="file"
                name="image"
                onChange={handleChangeInput}
                className="block w-[50%] text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-orange-50 file:text-orange-600
                      hover:file:bg-orange-100 
      "
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Delivery Exucative Name
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
            <div className="flex flex-wrap w-full  mb-6">
              <div className="w-full ">
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

export default CreateDriver;
