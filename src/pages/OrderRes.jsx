
import react, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
export default function OrderRes() {

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
                      Resturents Status
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Delivery Status
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                {user &&
                  user?.order.map((data) => {
                    return (
                      <tbody>
                        <tr class="border-b dark:border-neutral-500">
                          <td class="whitespace-nowrap  px-6 py-4 font-medium">
                            {data._id}
                          </td>

                          <td class="whitespace-nowrap  px-6 py-4">
                            {new Date(data.updatedAt).toLocaleDateString()}
                          </td>

                          <td class="whitespace-nowrap  px-6 py-4">
                            {data.status}
                          </td>

                          <td class="whitespace-nowrap  px-6 py-4">
                            {data.deliveryStatus}
                          </td>

                          <td class="whitespace-nowrap  px-6 py-4 font-semibold text-blue-500 cursor-pointer">
                            <Link to={`/view-order-res/${data._id}`}>View</Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
