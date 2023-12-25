import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    user: userDetails,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
