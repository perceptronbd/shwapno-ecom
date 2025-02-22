import { secureApi } from "./secure.service";

export const userApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<unknown, void>({
      query: () => ({
        url: "/users/profile",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = userApi;
