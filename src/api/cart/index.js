import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addToCart = createAsyncThunk(
  "fetch/addToCart",
  async (food, thunkAPI) => {
    const { cart } = thunkAPI.getState();
    const token = localStorage.getItem("token");
    if (cart.find((f) => f.food.user !== food.user)) {
      throw { message: "Cannot add multiple restaurant" };
    }
    try {
      const res = await axios.patch(
        "https://food-backend-grng.onrender.com/user/addcart",
        {
          cart: [
            ...cart,
            {
              food,
              count: 1,
            },
          ],
        },
        {
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        return {
          food: food,
          count: 1,
        };
      }
    } catch (error) {
      throw { message: error?.response?.data.msg || error.message };
    }
  }
);
const incrementCart = createAsyncThunk(
  "fetch/incrementCart",
  async (food, thunkAPI) => {
    // const { cart } = thunkAPI.getState();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        "https://food-backend-grng.onrender.com/user/increment",
        {
          food,
        },
        {
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        return {
          food: food,
          count: 1,
        };
      }
    } catch (error) {
      console.log("thisplace", error);
      throw { message: error?.response?.data.msg || error.message };
    }
  }
);
const decrementCart = createAsyncThunk(
  "fetch/decrementCart",
  async (food, thunkAPI) => {
    const { cart } = thunkAPI.getState();
    const token = localStorage.getItem("token");
    console.log("aa raha he?");
    const foodFound = cart.find((c) => c.food._id == food._id);
    if (foodFound.count == 0) throw { message: "Cannot decrement after 0!" };
    try {
      const res = await axios.patch(
        "https://food-backend-grng.onrender.com/user/decrement",
        {
          food,
        },
        {
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        return {
          food: food,
          count: 1,
        };
      }
    } catch (error) {
      throw { message: error?.response?.data.msg || error.message };
    }
  }
);
const removeCart = createAsyncThunk(
  "fetch/removecart",
  async (food, thunkAPI) => {
    const { cart } = thunkAPI.getState();
    const token = localStorage.getItem("token");
    console.log("aa raha he?");
    const foodFound = cart.find((c) => c.food._id == food._id);
    if (foodFound.count == 0) throw { message: "Cannot decrement after 0!" };
    try {
      const res = await axios.patch(
        "https://food-backend-grng.onrender.com/user/remove",
        {
          food,
        },
        {
          headers: {
            
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (res.status == 200) {
        return {
          food: food,
          count: 1,
        };
      }
    } catch (error) {
      throw { message: error?.response?.data.msg || error.message };
    }
  }
);

export { addToCart, incrementCart, decrementCart, removeCart };
