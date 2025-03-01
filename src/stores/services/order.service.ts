import { CreateOrderRequest, OrderResponse } from "../states/order.state";
import { baseApi } from "./base.service";
import { TAG_TYPES } from "../tagtypes";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      OrderResponse,
      { branchId: string; data: CreateOrderRequest }
    >({
      query: ({ branchId, data }) => ({
        url: `/customers/order/${branchId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: TAG_TYPES.ORDER, id: "LIST" },
        {
          type: TAG_TYPES.CART,
          id: "LIST",
        },
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateOrderMutation } = orderApi;
