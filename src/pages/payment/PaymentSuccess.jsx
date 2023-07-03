import React, { useEffect } from "react";
import axios from "axios";
import { emptyCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
export default function PaymentSuccess() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function updatePayment() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.post(
          "https://food-backend-grng.onrender.com/user/create-order",
          {},
          {
            headers: {
             
              Authorization: `Bearer ${token}`,
            },
           }
        );
        if (res.status == 200) {
          dispatch(emptyCart());
        }
      } catch (error) {}
    }
    updatePayment();
  }, []);
  return (
    <>
      <div className=" h-screen ">
        <h1 className="text-3xl text-emerald-600 mt-20 font-semibold text-center">
          Payment was Successfull
        </h1>
      </div>
    </>
  );
}
