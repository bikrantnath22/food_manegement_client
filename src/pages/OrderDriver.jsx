import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function OrderDriver() {
  const [user, setUser] = useState({});
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

  return (
    <div>
      <div class="flex flex-col w-[80%] m-auto">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center text-sm font-light">
                <thead class="border-b bg-orange-100 font-medium text-gray-800 dark:border-neutral-500 dark:bg-orange-200">
                  <tr>
                    <th scope="col" class=" px-6 py-4">
                      Id
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Date
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Status
                    </th>

                    <th scope="col" class=" px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.order?.map((data, index) => (
                    <ShowOrder data={data} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ShowOrder = ({ data, index }) => {
  const user_id  = localStorage.getItem("user_id");
  console.log(user_id)
 
  const [status, setStatus] = useState(
    data.deliveryStatus == "pending" ? "Select" : data.deliveryStatus
  );
  async function acceptOrder(id) {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `https://food-backend-grng.onrender.com/user/delivery/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        alert("Updated!");
        window.location.reload();
      }
    } catch (error) {
      alert(error?.response?.data?.msg || error.message);
    }
  }
  async function updateOrder(id) {
    const token = localStorage.getItem("token");
    if (status == "Select") {
      return alert("Please select a value");
    }
    try {
      const res = await axios.patch(
        `https://food-backend-grng.onrender.com/user/delivery/update/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        alert("Updated!");
        window.location.reload();
      }
    } catch (error) {
      alert(error?.response.data.msg || error.message);
    }
  }

  return (
    <tr class="border-b dark:border-neutral-500">
      <td class="whitespace-nowrap  px-6 py-4 font-medium">{data?._id}</td>

      <td class="whitespace-nowrap  px-6 py-4">
        {new Date(data.createdAt).toLocaleDateString()}
      </td>

      <td class="whitespace-nowrap  px-6 py-4">
        {data.deliveryStatus == "pending" ? (
          <button
            onClick={() => acceptOrder(data._id)}
            className="px-7 py-2 border-[1px] border-emerald-400 text-emerald-700 font-semibold rounded-md shadow-lg"
          >
            Accept
          </button>
        ) : (
          <div className="flex justify-center gap-2">
            {user_id  === data?._id ? (
              <div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="p-2"
                >
                  <option hidden value="Select">
                    Select
                  </option>
                  <option value="pickup">Pick Up</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  onClick={() => updateOrder(data._id)}
                  className="border border-orange-400 rounded-md p-2 text-orange-400 hover:text-orange-700 hover:border-orange-500"
                >
                  Update
                </button>
              </div>
            ) : (
              <div>{data.deliveryStatus}</div>
            )}
          </div>
        )}
      </td>
      <td class="whitespace-nowrap  px-6 py-4 font-semibold text-blue-500 cursor-pointer">
        <Link to={`/view-order-driver/${data._id}`}>View</Link>
      </td>
    </tr>
  );
};

export default OrderDriver;
