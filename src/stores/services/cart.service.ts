import {
  AddToCartRequest,
  CartResponse,
  UpdateCartRequest,
} from "@/stores/states/cart.state";
import { baseApi } from "./base.service";
import { TAG_TYPES } from "../tagtypes";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<CartResponse, AddToCartRequest>({
      query: (body) => ({ url: "/customers/cart", method: "PUT", body }),
      invalidatesTags: [{ type: TAG_TYPES.CART, id: "LIST" }],
    }),
    getCart: builder.query<CartResponse, string>({
      query: (sessionId) => `/customers/cart/${sessionId}`,
      providesTags: [{ type: TAG_TYPES.CART, id: "LIST" }],
    }),
    updateCart: builder.mutation<
      CartResponse,
      { sessionId: string; data: UpdateCartRequest }
    >({
      query: ({ sessionId, data }) => ({
        url: `/customers/cart/${sessionId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: TAG_TYPES.CART, id: "LIST" }],
    }),
  }),
});

export const { useAddToCartMutation, useGetCartQuery, useUpdateCartMutation } =
  cartApi;
