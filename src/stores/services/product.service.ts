// services/product.service.ts
import { ApiResponse } from "@/lib/types/api";
import { Product } from "../states/product.state";
import { baseApi } from "./base.service";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchProducts: builder.query<Product[], string>({
      query: (branchId) => `/customers/products/branch/${branchId}`,
      transformResponse: (response: ApiResponse<Product[]>) => response.data,
    }),
  }),
});

export const { useGetBranchProductsQuery } = productApi;
