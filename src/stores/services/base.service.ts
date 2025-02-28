import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAG_TYPES_LIST } from "../tagtypes";

export const baseApi = createApi({
  reducerPath: "baseQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ENDPOINT,
  }),
  tagTypes: TAG_TYPES_LIST,
  endpoints: () => ({}),
});
