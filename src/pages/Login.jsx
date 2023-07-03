import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // const notify = () => toast("Here is your toast.");
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDetails = await axios.post(
        "https://food-backend-grng.onrender.com/user/login",
        {
          ...user,
        },
        {
          withCredentials: true,
        }
      );
      if (userDetails.status === 200) {
        localStorage.setItem("firstLogin", true);
        localStorage.setItem("role", userDetails.data.role);
        localStorage.setItem("user_id", userDetails.data.user_id);
        localStorage.setItem("token", userDetails.data.token);
        toast.success("Login Successfully");
      }
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response.data.msg, {
        duration: 1000,
      });
    }
  };
  return (
    <div className=" ">
      <div className=" ">
        <div className=" min-h-3/4 flex flex-col sm:justify-center items-center  mt-12 ">
          <Toaster />
          <div className=" sm:max-w-md w-3/4">
            <div className=" w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md ">
              <label
                htmlFor=""
                className="block mt-3 text-xl text-gray-900 text-center font-semibold"
              >
                Login
              </label>
              <form className="mt-10" onSubmit={loginSubmit}>
                <div className="mt-7">
                  <label
                    htmlFor=""
                    className="block text-red-400 text-sm font-semibold mb-2"
                  >
                    *Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={onChangeInput}
                    placeholder="Enter Your email"
                    className="mt-1 p-2 block w-full border-none bg-gray-300 h-11 rounded-xl shadow-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  />
                </div>

                <div className="mt-7">
                  <label
                    htmlFor=""
                    className="block text-red-400 text-sm font-semibold mb-2"
                  >
                    *Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={onChangeInput}
                    placeholder="Enter Your password"
                    className="mt-1 p-2 block w-full border-none bg-gray-300 h-11 rounded-xl shadow-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <p
                    className="text-md font-semibold cursor-pointer text-gray-600"
                    onClick={onOpenModal}
                  >
                    Forget Password
                  </p>
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="bg-orange-600  w-full py-3 rounded-xl text-stone-50 font-bold shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out   hover:scale-105"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <a
                    href="/signup"
                    className="block text-gray-600 text-sm font-semibold mt-3 "
                  >
                    Don't have a account ? Sign Up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div>
          <div className="p-2">
            <p className="text-xl font-bold text-gray-500 mb-2">
              Forget Password ?
            </p>
            <p className="text-md font-semibold text-gray-700">
              Relex and try to remember your password
            </p>
            <div className="flex justify-end">
              <p className="px-4 py-2 bg-gray-500 text-white mt-2">Thanks!</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
