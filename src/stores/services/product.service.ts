import { Product, ProductResponse } from "@/stores/states/product.state";
import { baseApi } from "./base.service";

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
