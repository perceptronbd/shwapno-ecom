import {
  AddToCartRequest,
  CartResponse,
  DeleteCartItemResponse,
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
      onQueryStarted: async (
        { sessionId, data },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", sessionId, (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.map((item) => {
                // Match by productId (NOT id) since the request uses productId
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
      DeleteCartItemResponse,
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
