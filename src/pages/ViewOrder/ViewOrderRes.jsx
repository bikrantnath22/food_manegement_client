import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ViewOrderRes() {
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getaRes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`https://food-backend-grng.onrender.com/user/orderByid/${id}`, {
      headers: {
        
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    setState(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getaRes();
  }, []);

 

  return (
    <div>
      <div className="  pt-4">
        <h1 className="mb-4 text-center text-2xl font-bold">Order Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 flex flex-col-reverse  md:flex-row md:flex md:space-x-6 xl:px-0 ">
          <div className="overflow-auto md:h-[70vh] md:w-[70%]">
            <div className=" md:w-full">
              <div className="justify-between mb-6 rounded-lg bg-white p-6  sm:flex sm:justify-start">
                <img
                  src={state?.delivery?.avatar?.download_url}
                  alt="product-image"
                  className=" h-16 w-24 rounded-md sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between flex flex-col">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {state?.delivery?.name}
                    </h2>
                  </div>
                  <div className="mt-5 sm:mt-0"> 
                    <h5 className="text-sm font-bold text-gray-500">
                      Address : {state?.delivery?.address}
                    </h5>
                  </div>
                  <div className="mt-5 sm:mt-0"> 
                    <h5 className="text-sm font-bold text-gray-400">
                      Phone : {state?.delivery?.phone}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="font-semibold text-lg text-gray-500">Item</p>
            </div>

            {state &&
              state?.cart?.map((data) => {
                return (
                  <div className="rounded-lg md:w-full">
                    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                      <img
                        src={data?.food?.avatar?.download_url}
                        alt="product-image"
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {data.food.name}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700">{data?.food?.description}</p>
                          <p className="mt-1 text-xs text-gray-700">Qty {data?.count}</p>
                          <p className="mt-1 text-xs text-gray-700">
                            Rs : <del className="text-red-500">{data?.food?.Price}</del>
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-700">
                            Rs : <span className="text-green-500 ">{data?.food?.DiscountPrice}</span>
                          </p>
                        </div>
                     
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

         <div className="md:w-1/3 flex flex-col">
         <div className="mt-6 mb-2 rounded-lg border bg-white p-6 shadow-md md:mt-0 ">
         <div className="mt-4">
           <div className="flex justify-between">
             <p className="text-gray-700">Total Discount</p>
             <p className="text-red-500 text-md font-semibold">
               ₹ {state?.totalDiscount}
             </p>
           </div>
           <hr className="my-4" />
           <div className="flex justify-between">
             <p className="text-lg font-bold">Total</p>
             <div className="">
               <p className="mb-1 text-xl font-bold">Rs {state?.total}</p>
             </div>
           </div>
         </div>
       </div>
       <div className="mt-6  rounded-lg border bg-white p-6 shadow-md md:mt-0 ">
         <div className="mt-4">
           <div className="flex items-center flex-col">
           <img
                  src="https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1"
                  alt="product-image"
                  className="w-24 h-20 rounded-md sm:w-40"
                />
             
           </div>
           <div className="flex justify-between">
             <p className="text-md font-bold text-gray-600">Customer Name</p>
             <div className="">
               <p className="mb-1 text-md font-bold text-gray-600">{state?.user?.name}</p>
             </div>
           </div>
           <div className="flex justify-between">
             <p className="text-sm font-bold text-gray-500">address</p>
             <div className="">
               <p className="mb-1 text-sm font-bold text-gray-500">{state?.address}</p>
             </div>
           </div>
           <div className="flex justify-between">
             <p className="text-sm font-bold text-gray-500">Phone</p>
             <div className="">
               <p className="mb-1 text-sm font-bold text-gray-500">{state?.phone}</p>
             </div>
           </div>
          
           
         </div>
       </div>
         </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrderRes;
