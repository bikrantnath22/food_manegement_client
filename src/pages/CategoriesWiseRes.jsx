import react, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CategoriesWiseRes() {
  const { id } = useParams();
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  const getaRes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `https://food-backend-grng.onrender.com/api/get_category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    setState(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getaRes();
  }, []);
  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="flex justify-center">
        <div className="md:w-[80%] w-full">
          <p className="capitalize text-gray-600 font-semibold italic text-xl">
            Resturents
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4">
            {state &&
              state?.user?.map((data) => {
                return (
                  <div className=" justify-center ">
                    <div class="block rounded-lg shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] dark:bg-neutral-100">
                      <div
                        class="relative overflow-hidden bg-cover bg-no-repeat"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        <img
                          class="rounded-t-lg h-[150px] w-full cursor-pointer"
                          src={data?.avatar?.download_url}
                          alt=""
                        />
                        <Link to={`/food/${data._id}`}>
                          <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                        </Link>
                      </div>
                      <div class="p-4 w-full">
                        <h5 class="mb-2 text-lg  font-medium  text-neutral-200 dark:text-neutral-700 capitalize">
                          {data?.name}
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesWiseRes;
