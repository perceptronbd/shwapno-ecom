// services/cart.service.ts
import { ApiResponse } from "@/lib/types/api";
import { baseApi } from "./base.service";
import {
  AddToCartRequest,
  Cart,
  UpdateCartRequest,
} from "../states/cart.state";
import { TAG_TYPES } from "../tagtypes";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<ApiResponse<Cart>, AddToCartRequest>({
      query: (body) => ({ url: "/customers/cart", method: "PUT", body }),
      invalidatesTags: [{ type: TAG_TYPES.CART, id: "LIST" }],
    }),
    getCart: builder.query<ApiResponse<Cart>, string>({
      query: (sessionId) => `/customers/cart/${sessionId}`,
      providesTags: [{ type: TAG_TYPES.CART, id: "LIST" }],
    }),
    updateCart: builder.mutation<
      ApiResponse<Cart>,
      { sessionId: string; data: UpdateCartRequest }
    >({
      query: ({ sessionId, data }) => ({
        url: `/customers/cart/${sessionId}`,
        method: "PATCH",
        body: data,
      }),
      // Update the optimistic update with proper typing
      onQueryStarted: async (
        { sessionId, data },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", sessionId, (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.map((item) => {
                const updated = data.items.find(
                  (i) => i.productId === item.productId,
                );
                return updated ? { ...item, quantity: updated.quantity } : item;
              });
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.CART, id: "LIST" }],
    }),
    deleteCartItem: builder.mutation<
      ApiResponse<null>,
      { sessionId: string; productId: string }
    >({
      query: ({ sessionId, productId }) => ({
        url: `/customers/cart/item/${sessionId}`,
        method: "DELETE",
        body: { productId },
      }),
      invalidatesTags: [{ type: TAG_TYPES.CART, id: "LIST" }],
    }),
  }),
});
export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartItemMutation,
} = cartApi;
