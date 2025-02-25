import { Product, ProductResponse } from "@/lib/types/products";
import { baseApi } from "../base.service";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchProducts: builder.query<Product[], string>({
      query: (branchId) => ({
        url: `/customers/products/branch/${branchId}`,
      }),
      transformResponse: (response: ProductResponse) => response.data,
    }),
  }),
});

export const { useGetBranchProductsQuery } = productApi;
