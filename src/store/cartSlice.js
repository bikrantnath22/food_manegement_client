import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  incrementCart,
  decrementCart,
  removeCart,
} from "../api/cart/index";
import toast from "react-hot-toast";
const initialState = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCart(_, action) {
      return action.payload;
    },
    emptyCart() {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(addToCart.rejected, (_, action) => {
      console.log(action);
      toast.error(action.error.message);
    });

    builder.addCase(incrementCart.fulfilled, (state, action) => {
      console.log(action.payload);
      return state.map((c) => {
        if (c.food._id == action.payload.food._id) {
          return { ...c, count: c.count + 1 };
        }
        return c;
      });
    });
    builder.addCase(incrementCart.rejected, (_, action) => {
      console.log(action);
      toast.error(action.error.message);
    });
    builder.addCase(decrementCart.fulfilled, (state, action) => {
      console.log(action.payload);
      return state.map((c) => {
        if (c.food._id == action.payload.food._id) {
          return { ...c, count: c.count - 1 };
        }
        return c;
      });
    });
    builder.addCase(decrementCart.rejected, (_, action) => {
      console.log(action);
      toast.error(action.error.message);
    });
    builder.addCase(removeCart.fulfilled, (state, action) => {
      console.log(action.payload);
      return state.filter((c) => c.food._id != action.payload.food._id);
    });
    builder.addCase(removeCart.rejected, (_, action) => {
      console.log(action);
      toast.error(action.error.message);
    });
  },
});

export const { fetchCart,emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
