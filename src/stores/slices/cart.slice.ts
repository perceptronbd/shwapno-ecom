import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../states/cart.state";
import { cartApi } from "../services/cart.service";
import { RootState } from "..";
import { orderApi } from "../services/order.service";

const initialState: CartState = {
  sessionId: null,
  customerId: null,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state) => {
      if (typeof window !== "undefined") {
        state.sessionId = localStorage.getItem("cartSessionId");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cartApi.endpoints.addToCart.matchFulfilled,
        (state, { payload }) => {
          if (payload.data?.sessionId) {
            state.sessionId = payload.data.sessionId;
            if (typeof window !== "undefined") {
              localStorage.setItem("cartSessionId", payload.data.sessionId);
            }
          }
          if (payload.data?.items) {
            state.items = payload.data.items;
          }
        },
      )
      .addMatcher(
        cartApi.endpoints.getCart.matchFulfilled,
        (state, { payload }) => {
          if (payload.data?.items) {
            state.items = payload.data.items;
          }
        },
      )
      .addMatcher(
        cartApi.endpoints.updateCart.matchFulfilled,
        (state, { payload }) => {
          if (payload.data?.items) {
            state.items = payload.data.items;
          }
        },
      )
      .addMatcher(
        orderApi.endpoints.createOrder.matchFulfilled,
        (state, { payload }) => {
          state.items = [];
          if (typeof window !== "undefined" && payload.data?.customer?.id) {
            state.customerId = payload.data.customer.id;
            localStorage.setItem("customerId", payload.data.customer.id);
            const { firstName, email, mobile, address } = payload.data.customer;
            localStorage.setItem(
              "customerInfo",
              JSON.stringify({
                firstName,
                email,
                mobile,
                address,
              }),
            );
          }
        },
      );
  },
});

export const { initializeCart } = cartSlice.actions;
export const selectCartSessionId = (state: { cart: CartState }) =>
  state.cart.sessionId;
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
