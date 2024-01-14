import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Credentials } from "../../models/Credentials";

export const authApi = createApi({
  reducerPath: "authApi",
  //baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  //Url che rimanda all'indirizzo del vostro server in locale, in modo da comunicare con i servizi backend
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4430/' }),
  endpoints: (builder) => ({
    registration: builder.mutation<{ hasAccessed: boolean }, Credentials>({
      query(body) {
        return {
          url: "private-user",
          method: "POST",
          body: {
            ...body,
            instant: new Date().toISOString(),
          },
        };
      },
    }),
    login: builder.mutation<{ hasAccessed: boolean }, Credentials>({
      query(body) {
        return {
          url: "auth/login",
          //url: "login",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
