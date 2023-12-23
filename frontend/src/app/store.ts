import { configureStore } from "@reduxjs/toolkit";
import authReducer from "src/features/auth/authSlice";
import { apiSlice } from "src/app/api/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
