import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51IlCj4SJiIZMEXxo7cJEpykBpB8Lhl9cRS2fzysk5l74JtMnJMGcHqObtWnt03wlYv2QzZ8ctRERMCl2RId9bxTk00OiRvM8em"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useLocation();
  console.log(state);
  history.replaceState({}, "", "/");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    async function getCurrentKey() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.post(
          "https://food-backend-grng.onrender.com/user/create-payment-intent",
          {
            product: state,
          },
          {
            headers: {
             
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        return setClientSecret(res.data.ClientSecret);
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentKey();
  }, [state?.amount]);

  const appearance = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="bg-slate-700">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={state.total} />
        </Elements>
      )}
    </div>
  );
}
