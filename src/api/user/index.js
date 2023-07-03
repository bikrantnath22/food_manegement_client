import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUser = createAsyncThunk("fetch/user", async () => {
  const token = localStorage.getItem("token");
  try {
    const user = await axios.get("https://food-backend-grng.onrender.com/user/profile", {
      headers: {
            
        Authorization: `Bearer ${token}`,
      },
    });
    return user.data || {};
  } catch (error) {
    let errorData = {
      code: `${error?.response?.status || "511"}`,
      message: error?.response?.data.msg || error?.message,
    };
    throw errorData;
  }
});

export { fetchUser };
