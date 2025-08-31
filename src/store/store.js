import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api.js";
import { videoApi } from "./videoApi.js";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [videoApi.reducerPath]: videoApi.reducer, // videoApi reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware, videoApi.middleware), // videoApi middleware əlavə edildi
});
