import React,{useState} from 'react'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Signup() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://food-backend-grng.onrender.com/user/register", { ...user });

      // localStorage.setItem("firstLogin", true);
      toast.success("Register Successfully");
      window.location.href = "/login";
    } catch (err) {
      toast.error(err.response.data.msg,{
        duration: 1000,
      });
    }
  };
  return (
    <div className=" ">
    
    <div className=" ">
    <Toaster />
      <div className=" min-h-3/4 flex flex-col sm:justify-center items-center  mt-2 ">
        <div className=" sm:max-w-md w-3/4">
          <div className=" w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md ">
            <label
              htmlFor=""
              className="block mt-3 text-xl text-gray-900 text-center font-semibold"
            >
              Create Your Account
            </label>
            <form className="mt-10"  onSubmit={registerSubmit}>
            <div className="mt-7">
                <label
                  htmlFor=""
                  className="block text-red-400 text-sm font-semibold mb-2"
                >
                  *Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={onChangeInput}
                  placeholder="Enter Your Name "
                  className="mt-1 p-2 block w-full border-none bg-gray-300 h-11 rounded-xl shadow-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                />
              </div>
              

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
                  className="mt-1 p-2 block w-full border-none bg-gray-300 h-11 rounded-full shadow-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                />
              </div>

              <div className="mt-7">
                <button type="submit"  className="bg-orange-600  w-full py-3 rounded-xl text-stone-50 font-bold shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out   hover:scale-105">
                  SignUp
                </button>
              </div>
              <div>
                <a
                  href="/login"
                  className="block text-gray-600 text-sm font-semibold mt-3 "
                >
                  Login Here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup