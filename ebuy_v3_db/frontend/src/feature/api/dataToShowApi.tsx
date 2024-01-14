import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Products } from "../../models/Products";

export const dataToShowApi = createApi({
  reducerPath: "dataToShowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  //Url che rimanda all'indirizzo del vostro server in locale, in modo da comunicare con i servizi backend
  //baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => `products/categories`,
      //query: () => `get-categories`,
    }),
    getProducts: builder.query<Products, void>({
      //getProducts: builder.query<Product[], void>({
      query: () => `products`,
      //query: () => `get-products`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsQuery } = dataToShowApi;
