import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { videoApi } from "./videoApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [videoApi.reducerPath]: videoApi.reducer, // videoApi reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware, videoApi.middleware), // videoApi middleware əlavə edildi
});
