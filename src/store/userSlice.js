import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../api/user/index";

const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(fetchUser.rejected, (_, action) => {
      return {};
    });
  },
});

export const { fetchCart } = userSlice.actions;
export default userSlice.reducer;
