import { configureStore } from "@reduxjs/toolkit";
import accessSlice from "./util/accessSlice";
import { authApi } from "../feature/api/authApi";
import { dataToShowApi } from "../feature/api/dataToShowApi";

const store = configureStore({
  reducer: {
    access: accessSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [dataToShowApi.reducerPath]: dataToShowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, dataToShowApi.middleware),
});

export default store;
