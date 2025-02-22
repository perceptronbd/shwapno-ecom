import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../states/auth.state";
import { authApi } from "../services/auth.service";
import { RootState } from "..";

const initialState: AuthState = {
  user: null,
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    accessTokenRefresh: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.accessToken = payload.accessToken;
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.accessToken = "";
      });
  },
});

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const { accessTokenRefresh } = authSlice.actions;

export default authSlice.reducer;
