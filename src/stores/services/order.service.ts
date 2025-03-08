import { baseApi } from "./base.service";
import { TAG_TYPES } from "../tagtypes";
import { ApiResponse } from "@/lib/types/api";
import { CreateOrderRequest, Order } from "../states/order.state";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      ApiResponse<Order>,
      { branchId: string; data: CreateOrderRequest }
    >({
      query: ({ branchId, data }) => ({
        url: `/customers/order/${branchId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: TAG_TYPES.ORDER, id: "LIST" },
        { type: TAG_TYPES.CART, id: "LIST" },
      ],
    }),
    getCustomerOrders: builder.query<Order[], string>({
      query: (customerId) => `/customers/order/${customerId}`,
      transformResponse: (response: ApiResponse<Order[]>) => response.data,
      providesTags: [{ type: TAG_TYPES.ORDER, id: "LIST" }],
    }),
  }),
});

export const { useCreateOrderMutation, useGetCustomerOrdersQuery } = orderApi;
