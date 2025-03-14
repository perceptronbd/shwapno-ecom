import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BranchData {
  id: string;
  name: string;
}

const getInitialBranch = (): BranchData => {
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("branchData");
    return stored ? JSON.parse(stored) : { id: "", name: "" };
  }
  return { id: "", name: "" };
};

const initialState: BranchData = getInitialBranch();

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranch: (state, action: PayloadAction<BranchData>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("branchData", JSON.stringify(action.payload));
      }
    },
  },
});

export const selectBranchId = (state: { branch: { id: string } }) =>
  state.branch.id;
export const selectBranchName = (state: { branch: { name: string } }) =>
  state.branch.name;
export const { setBranch } = branchSlice.actions;
export default branchSlice.reducer;
