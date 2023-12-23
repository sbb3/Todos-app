import { createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "src/interfaces";

const initialState = {
  accessToken: "",
  user: {} as User,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state: AuthState, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state: AuthState) => {
      state.accessToken = "";
      state.user = {} as User;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
