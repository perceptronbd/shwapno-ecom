import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ENDPOINT,
  }),
  endpoints: () => ({}),
});
