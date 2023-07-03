import react, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";

import { Link } from "react-router-dom";
function ViewAllFood() {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

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

  const deleteFood = async (id) => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      try {
        const res = await axios.delete(
          `https://food-backend-grng.onrender.com/api/delete-food/${id}`
        );
        alert("😍 Successfully Deleted");
        getProfile();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-center">
        <h2 className="text-xl font-semibold text-gray-600 p-4">Foods</h2>
      </div>

      <div className="w-full flex justify-center p-4 flex-col">
        <div className=" flex justify-center ">
          <div className="md:w-[60%] lg:w-[50%] flex justify-end">
            <Link
              className="middle none center rounded-lg mb-2 bg-orange-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              to="/add-food"
            >
              Create Food
            </Link>
          </div>
        </div>

        {user &&
          user.food.map((data) => {
            return (
              <div className="flex justify-center ">
                <ul class="max-w-xl divide-y border-b-2 border-gray-300 mb-2 divide-gray-200 dark:divide-gray-700 w-full justify-center flex flex-col">
                  <li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <img
                          class="w-12 h-12 rounded-full"
                          src={data?.avatar?.download_url}
                          alt=""
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-md font-medium text-gray-900 truncate ">
                          {data?.name}
                        </p>
                        <div className="flex  items-center">
                          <p class="text-md text-blue-500 truncate dark:text-blue-400 mr-2">
                            {data?.DiscountPrice}
                          </p>
                          <p class="text-sm text-blue-500 truncate dark:text-gray-400">
                            <del className="text-red-500">{data?.Price}</del>
                          </p>
                        </div>
                        <p class="text-xs font-medium text-gray-500 truncate ">
                          {data?.description}
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 ">
                        <div className="flex space-x-2">
                          <Link to={`/edit-food/${data._id}`}>
                            <EditOutlined className="text-green-600 text-xl" />
                          </Link>

                          <DeleteFilled
                            onClick={() => deleteFood(data._id)}
                            className="text-red-600 text-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ViewAllFood;
