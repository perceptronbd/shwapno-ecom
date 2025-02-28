import { AddToCartRequest, CartResponse } from "@/stores/states/cart.state";
import { baseApi } from "./base.service";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<CartResponse, AddToCartRequest>({
      query: (body) => ({ url: "/customers/cart", method: "PUT", body }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
