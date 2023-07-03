import React,{useState,useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialState = {
  name: "",
  Price: "",
  DiscountPrice: "",
  description: "",
  avatar: null,
};

function EditFood() {
  const [food, setFood] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const { name, Price, DiscountPrice, description ,avatar} = food;

  const getFood = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const res = await axios.get(
      `https://food-backend-grng.onrender.com/api/get_food/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    setFood(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getFood();
  }, []);


  const handleChnage = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      setFood({ ...food, [name]: e.target.files[0] });
      return;
    }
    setFood({ ...food, [name]: value });
  };

  const updateInfor = async (event) => {
    event.preventDefault();


    const formData = new FormData();
    if (name) formData.append("name", food.name);
    
    if (Price) formData.append("Price", food.Price);
    if (description) formData.append("description", food.description);
    if (DiscountPrice) formData.append("DiscountPrice", food.DiscountPrice);
    if (avatar) formData.append("avatar", food.avatar);
    try {
      await axios.patch(`https://food-backend-grng.onrender.com/api/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",

        },
      });
      console.log(food);
      toast.success("😍 Successfully update");
      
    } catch (err) {
      setFood({
        ...food,
        err: err.response.data.msg,
        success: "",
      });
    }
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    if (
      name ||
      Price ||
      DiscountPrice ||
      description 
      
    )
      updateInfor();
  };

  return (
    <>
      <div className="flex justify-center">
        <Toaster />
        <div className="w-full md:w-[80%] md:flex md:space-x-4 p-4" >
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
                    food.avatar?.download_url
                      ? food.avatar.download_url
                      : !food.avatar?.name
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3W3oppN7sdVCsUWwwnPIn9pX6E6G2UW70w&usqp=CAU"
                      : URL.createObjectURL(food.avatar)
                  }  />
            </div>
            <input
              type="file"
              onChange={handleChnage}
              name="avatar"
              className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-orange-50 file:text-orange-600
                    hover:file:bg-orange-100 
                   
    "
            />
          </div>

          <div className="flex flex-col" >
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
                  placeholder="Enter Name"
                  name="name"
                  onChange={handleChnage}
                  value={food.name}
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
                  onChange={handleChnage}
                  value={food.Price}
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
                  onChange={handleChnage}
                  value={food.DiscountPrice}
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
                  onChange={handleChnage}
                  value={food.description}
                />
              </div>
            </div>

            <button
              className="middle none center w-full rounded-lg bg-orange-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              type="submit"
              onClick={updateInfor}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditFood;
