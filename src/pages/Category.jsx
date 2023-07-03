import React, { useState, useEffect } from "react";

import axios from "axios";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  name: "",
};

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
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

      console.log(formData);
      const res = await axios({
        method: "POST",
        url: "https://food-backend-grng.onrender.com/api/category",
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
    const getCategories = async () => {
      const res = await axios.get("https://food-backend-grng.onrender.com/api/category");
      console.log(res.data);
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);

  const deleteCategory = async (id) => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      try {
        const res = await axios.delete(
          `https://food-backend-grng.onrender.com/api/category/${id}`
        );
        toast.success("😍 Successfully Deleted");
        getCategories();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="">
        <Toaster />
        <div className="md:w-[80%] md:m-auto">
          <h1 className="text-3xl font-bold text-center my-4 font-[Roboto] text-gray-500 ">
            Add Category{" "}
          </h1>
          <div className="flex flex-col md:flex w-[100%] md:flex-row">
            <form
              className="w-full md:w-[80%] md:space-x-4 p-4"
              onSubmit={handleFormSubmit}
            >
              <div className="flex-col flex space-y-1 mb-4">
                <div
                  className=" flex justify-center rounded p-4 "
                  style={{
                    border: "2px solid #fff7ef ",
                  }}
                >
                  <img
                    className="h-[200px] w-full md:w-[300px] object-fill   "
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
                <div className="  mb-6">
                  <div className="w-full mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Category Name
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

            <div className="w-full h-[78vh] overflow-auto">
              {categories.map((category) => (
                <div
                  className="w-full  group p-5 shadow-lg cursor-pointer rounded-md font-[Montserrat]"
                  key={category._id}
                >
                  <p
                    className="text-gray-500"
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      marginLeft: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {category.name}
                    <img
                      style={{ width: "100px", height: "90px" }}
                      src={category?.avatar?.download_url}
                      alt=""
                    />
                  </p>

                  <div className="text-right">
                    <EditOutlined
                      style={{
                        fontSize: "20px",
                        color: "#4dff4d",
                        marginRight: "20px",
                      }}
                    />
                    <DeleteFilled
                    onClick={() => deleteCategory(category._id)}
                      style={{
                        fontSize: "20px",
                        color: "crimson",
                        marginLeft: "20px",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
