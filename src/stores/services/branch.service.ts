import { Branch } from "../states/branch.state";
import { baseApi } from "./base.service";
import { ApiResponse } from "@/lib/types/api";

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchByName: builder.query<ApiResponse<Branch>, string>({
      query: (branchName) => `/customers/branch/${branchName}`,
    }),
  }),
});

export const { useGetBranchByNameQuery } = branchApi;
