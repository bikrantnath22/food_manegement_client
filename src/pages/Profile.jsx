import react, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { EditFilled } from "@ant-design/icons";
import RenderAvatar from "../components/RenderAvatar";
const initialState = {
  name: "",

  avatar: null,
};

function Profile() {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef(null);
  const { name, avatar } = user;

  const verifyRes = () => {
    const role = localStorage.getItem("role");
    return role === "resturent" ? true : false;
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const userResponse = await axios.get(
        "https://food-backend-grng.onrender.com/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      console.log(userResponse);
      setUser(userResponse.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const updateInfor = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (avatar) formData.append("avatar", user.avatar);
    try {
      axios.patch("https://food-backend-grng.onrender.com/user/update_profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(user);

      window.location.reload();
      toast.success("Update successfully", { autoClose: 1500 });
    } catch (err) {
      setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "avatar") {
      setUser({ ...user, [name]: e.target.files[0] });
      return;
    }
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = () => {
    if (name) updateInfor();
  };
  return (
    <>
      <Toaster />
      <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2 flex justify-center flex-col">
              {user.avatar && <RenderAvatar user={user} />}
              
              
            </div>
            <div className="p-2">
              <input
                type="text"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                value={user?.name}
                
                name="name"
              />

             

              <table className="text-xs my-3">
                <tbody>
                  {verifyRes() ? (
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Address
                      </td>
                      <td className="px-2 py-2">{user.address}</td>
                    </tr>
                  ) : null}
                  {verifyRes() ? (
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Phone
                      </td>
                      <td className="px-2 py-2">{user.phone}</td>
                    </tr>
                  ) : null}

                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">{user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
