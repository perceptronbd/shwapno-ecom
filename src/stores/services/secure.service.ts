import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { selectAccessToken, accessTokenRefresh } from "../slices/auth.slice";
import { RootState } from "..";
import { RefreshResponse } from "../states/auth.state";
import { authApi } from "./auth.service";

const baseQuerySecure = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_ENDPOINT,
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState() as RootState);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("No access token found!");
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuerySecure(args, api, extraOptions);

  const isUnauthorizedError = result.error?.status === 401;
  const isNotAuthEndpoint =
    api.endpoint !== "login" && api.endpoint !== "logout";

  if (isUnauthorizedError && isNotAuthEndpoint) {
    console.warn("Access token expired, trying refresh...");

    const refreshResult = await baseQuerySecure(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    const refreshResponse = refreshResult.data as RefreshResponse;

    if (refreshResponse.data) {
      api.dispatch(accessTokenRefresh({ accessToken: refreshResponse.data }));
      return await baseQuerySecure(args, api, extraOptions);
    } else {
      api.dispatch(authApi.endpoints.logout.initiate());
      return { error: { status: 401, data: "Unauthorized" } };
    }
  }

  return result;
};

export const secureApi = createApi({
  reducerPath: "secureApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
